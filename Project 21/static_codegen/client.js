const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const grpc = require('@grpc/grpc-js');

const messages = require('./route_guide_pb');
const services = require('./route_guide_grpc_pb');

const client = new services.RouteGuideClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const COORD_FACTOR = 1e7;

/**
 * Run the getFeature demo. Calls getFeature with a point known to have a
 * feature and a point known not to have a feature.

 */
function runGetFeature(point) {
  return new Promise((resolve, reject) => {
    const featureCallback = (error, feature) => {
      if (error) {
        console.log('error', error.message);
      }

      const latitude = feature.getLocation().getLatitude();
      const longitude = feature.getLocation().getLongitude();

      if (feature.getName() === '') {
        console.log(
          'Found no feature at ' +
            latitude / COORD_FACTOR +
            ', ' +
            longitude / COORD_FACTOR
        );
      } else {
        console.log(
          'Found feature called "' +
            feature.getName() +
            '" at ' +
            latitude / COORD_FACTOR +
            ', ' +
            longitude / COORD_FACTOR
        );
      }

      resolve();
    };

    client.getFeature(point, featureCallback);
  });
}

/**
 * Run the listFeatures demo. Calls listFeatures with a rectangle containing all
 * of the features in the pre-generated database. Prints each response as it
 * comes in.
 */
function runListFeatures(callback) {
  return new Promise((resolve, reject) => {
    const rect = new messages.Rectangle();

    const lo = new messages.Point();
    lo.setLatitude(400000000);
    lo.setLongitude(-750000000);
    rect.setLo(lo);

    const hi = new messages.Point();
    hi.setLatitude(420000000);
    hi.setLongitude(-730000000);
    rect.setHi(hi);

    console.log('Looking for features between 40, -75 and 42, -73');
    const call = client.listFeatures(rect);

    call.on('data', function (feature) {
      console.log(
        'Found feature called "' +
          feature.getName() +
          '" at ' +
          feature.getLocation().getLatitude() / COORD_FACTOR +
          ', ' +
          feature.getLocation().getLongitude() / COORD_FACTOR
      );
    });

    call.on('end', resolve);
  });
}

/**
 * Run the recordRoute demo. Sends several randomly chosen points from the
 * pre-generated feature database with a variable delay in between. Prints the
 * statistics when they are sent from the server.
 */
function runRecordRoute() {
  const randomDelay = (min, max) => {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, 'route_guide_db.json'),
      async (error, data) => {
        if (error) {
          console.log('error', error.message);
        }

        // Transform the loaded features to Feature objects
        const feature_list = JSON.parse(data).map((value) => {
          const feature = new messages.Feature();
          feature.setName(value.name);

          const location = new messages.Point();
          location.setLatitude(value.location.latitude);
          location.setLongitude(value.location.longitude);
          feature.setLocation(location);

          return feature;
        });

        const num_points = 10;

        const call = client.recordRoute((error, stats) => {
          if (error) {
            console.log('error', error.message);
          }

          console.log('Finished trip with', stats.getPointCount(), 'points');
          console.log('Passed', stats.getFeatureCount(), 'features');
          console.log('Travelled', stats.getDistance(), 'meters');
          console.log('It took', stats.getElapsedTime(), 'seconds');
          resolve();
        });

        for (let i = 0; i < num_points; i++) {
          const rand_point =
            feature_list[Math.floor(Math.random() * feature_list.length)];

          console.log(
            'Visiting point ' +
              rand_point.getLocation().getLatitude() / COORD_FACTOR +
              ', ' +
              rand_point.getLocation().getLongitude() / COORD_FACTOR
          );
          call.write(rand_point.getLocation());
          await randomDelay(500, 1500);
        }

        call.end();
      }
    );
  });
}

/**
 * Run the routeChat demo. Send some chat messages, and print any chat messages
 * that are sent from the server.
 */
function runRouteChat() {
  return new Promise((resolve, reject) => {
    const call = client.routeChat();

    call.on('data', function (note) {
      console.log(
        'Got message "' +
          note.getMessage() +
          '" at ' +
          note.getLocation().getLatitude() +
          ', ' +
          note.getLocation().getLongitude()
      );
    });

    call.on('end', resolve);

    const notes = [
      {
        location: {
          latitude: 0,
          longitude: 0,
        },
        message: 'First message',
      },
      {
        location: {
          latitude: 0,
          longitude: 1,
        },
        message: 'Second message',
      },
      {
        location: {
          latitude: 1,
          longitude: 0,
        },
        message: 'Third message',
      },
      {
        location: {
          latitude: 0,
          longitude: 0,
        },
        message: 'Fourth message',
      },
    ];

    notes.forEach((note) => {
      console.log(
        'Sending message "' +
          note.message +
          '" at ' +
          note.location.latitude +
          ', ' +
          note.location.longitude
      );

      const noteMsg = new messages.RouteNote();
      noteMsg.setMessage(note.message);

      const location = new messages.Point();
      location.setLatitude(note.location.latitude);
      location.setLongitude(note.location.longitude);
      noteMsg.setLocation(location);

      call.write(noteMsg);
    });

    call.end();
  });
}

/**
 * Run all of the demos in order
 */
async function main() {
  const point1 = new messages.Point();
  point1.setLatitude(409146138);
  point1.setLongitude(-746188906);
  await runGetFeature(point1);

  const point2 = new messages.Point();
  point2.setLatitude(0);
  point2.setLongitude(0);
  await runGetFeature(point2);

  await runListFeatures();
  await runRecordRoute();
  await runRouteChat();

  console.log('THE END');
}

if (require.main === module) {
  main();
}
