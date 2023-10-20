const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');

const messages = require('./route_guide_pb');
const services = require('./route_guide_grpc_pb');

const COORD_FACTOR = 1e7;

/**
 * For simplicity, a point is a record type that looks like
 * {latitude: number, longitude: number}, and a feature is a record type that
 * looks like {name: string, location: point}. feature objects with name===''
 * are points with no feature.
 */

/**
 * List of feature objects at points that have been requested so far.
 */
let feature_list = [];

/**
 * Get a feature object at the given point, or creates one if it does not exist.
 * @param {point} point The point to check
 * @return {feature} The feature object at the point. Note that an empty name
 *     indicates no feature
 */
function checkFeature(point) {
  let feature;

  // Check if there is already a feature object for the given point
  feature_list.forEach((feature) => {
    if (
      feature.getLocation().getLatitude() === point.getLatitude() &&
      feature.getLocation().getLongitude() === point.getLongitude()
    ) {
      return feature;
    }
  });

  feature = new messages.Feature();
  feature.setName('');
  feature.setLocation(point);

  return feature;
}

/**
 * getFeature request handler. Gets a request with a point, and responds with a
 * feature object indicating whether there is a feature at that point.
 * @param {EventEmitter} call Call object for the handler to process
 * @param {function(Error, feature)} callback Response callback
 */
function getFeature(call, callback) {
  callback(null, checkFeature(call.request));
}

/**
 * listFeatures request handler. Gets a request with two points, and responds
 * with a stream of all features in the bounding box defined by those points.
 * @param {Writable} call Writable stream for responses with an additional
 *     request property for the request value.
 */
function listFeatures(call) {
  const lo = call.request.getLo();
  const hi = call.request.getHi();

  const left = Math.min(lo.getLongitude(), hi.getLongitude());
  const right = Math.max(lo.getLongitude(), hi.getLongitude());
  const top = Math.max(lo.getLatitude(), hi.getLatitude());
  const bottom = Math.min(lo.getLatitude(), hi.getLatitude());

  // For each feature, check if it is in the given bounding box
  feature_list.forEach((feature) => {
    if (feature.getName() === '') {
      return;
    }
    if (
      feature.getLocation().getLongitude() >= left &&
      feature.getLocation().getLongitude() <= right &&
      feature.getLocation().getLatitude() >= bottom &&
      feature.getLocation().getLatitude() <= top
    ) {
      call.write(feature);
    }
  });

  call.end();
}

/**
 * Calculate the distance between two points using the "haversine" formula.
 * The formula is based on http://mathforum.org/library/drmath/view/51879.html.
 * @param start The starting point
 * @param end The end point
 * @return The distance between the points in meters
 */
function getDistance(start, end) {
  const toRadians = (num) => {
    return (num * Math.PI) / 180;
  };

  const R = 6371000; // earth radius in metres
  const lat1 = toRadians(start.getLatitude() / COORD_FACTOR);
  const lat2 = toRadians(end.getLatitude() / COORD_FACTOR);
  const lon1 = toRadians(start.getLongitude() / COORD_FACTOR);
  const lon2 = toRadians(end.getLongitude() / COORD_FACTOR);

  const deltalat = lat2 - lat1;
  const deltalon = lon2 - lon1;

  const a =
    Math.sin(deltalat / 2) * Math.sin(deltalat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltalon / 2) *
      Math.sin(deltalon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * recordRoute handler. Gets a stream of points, and responds with statistics
 * about the "trip": number of points, number of known features visited, total
 * distance traveled, and total time spent.
 * @param {Readable} call The request point stream.
 * @param {function(Error, routeSummary)} callback The callback to pass the
 *     response to
 */
function recordRoute(call, callback) {
  let point_count = 0;
  let feature_count = 0;
  let distance = 0;
  let previous = null;

  // Start a timer
  const start_time = process.hrtime();

  call.on('data', (point) => {
    point_count += 1;
    if (checkFeature(point).name !== '') {
      feature_count += 1;
    }
    /* For each point after the first, add the incremental distance from the
     * previous point to the total distance value */
    if (previous != null) {
      distance += getDistance(previous, point);
    }
    previous = point;
  });

  call.on('end', () => {
    const summary = new messages.RouteSummary();
    summary.setPointCount(point_count);
    summary.setFeatureCount(feature_count);
    // Cast the distance to an integer
    summary.setDistance(distance | 0);
    // End the timer
    summary.setElapsedTime(process.hrtime(start_time)[0]);
    callback(null, summary);
  });
}

const route_notes = {};

/**
 * Turn the point into a dictionary key.
 * @param {point} point The point to use
 * @return {string} The key for an object
 */
function pointKey(point) {
  return point.getLatitude() + ' ' + point.getLongitude();
}

/**
 * routeChat handler. Receives a stream of message/location pairs, and responds
 * with a stream of all previous messages at each of those locations.
 * @param {Duplex} call The stream for incoming and outgoing messages
 */
function routeChat(call) {
  call.on('data', (note) => {
    const key = pointKey(note.getLocation());
    /* For each note sent, respond with all previous notes that correspond to
     * the same point */
    if (route_notes.hasOwnProperty(key)) {
      route_notes[key].forEach((note) => {
        call.write(note);
      });
    } else {
      route_notes[key] = [];
    }
    // Then add the new note to the list
    route_notes[key].push(note);
  });

  call.on('end', () => {
    call.end();
  });
}

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(services.RouteGuideService, {
    getFeature: getFeature,
    listFeatures: listFeatures,
    recordRoute: recordRoute,
    routeChat: routeChat,
  });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      fs.readFile(
        path.resolve(__dirname, 'route_guide_db.json'),
        (err, data) => {
          if (err) {
            throw err;
          }

          // Transform the loaded features to Feature objects
          feature_list = JSON.parse(data).map((value) => {
            const feature = new messages.Feature();
            feature.setName(value.name);

            const location = new messages.Point();
            location.setLatitude(value.location.latitude);
            location.setLongitude(value.location.longitude);
            feature.setLocation(location);

            return feature;
          });

          routeServer.start();
        }
      );
    }
  );
}
