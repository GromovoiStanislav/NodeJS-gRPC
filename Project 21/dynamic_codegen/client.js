const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');

const PROTO_PATH = __dirname + '/../protos/route_guide.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const routeguide = grpc.loadPackageDefinition(packageDefinition).routeguide;

const client = new routeguide.RouteGuide(
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
      if (feature.name === '') {
        console.log(
          'Found no feature at ' +
            feature.location.latitude / COORD_FACTOR +
            ', ' +
            feature.location.longitude / COORD_FACTOR
        );
      } else {
        console.log(
          'Found feature called "' +
            feature.name +
            '" at ' +
            feature.location.latitude / COORD_FACTOR +
            ', ' +
            feature.location.longitude / COORD_FACTOR
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
function runListFeatures() {
  return new Promise((resolve, reject) => {
    const rectangle = {
      lo: {
        latitude: 400000000,
        longitude: -750000000,
      },
      hi: {
        latitude: 420000000,
        longitude: -730000000,
      },
    };

    console.log('Looking for features between 40, -75 and 42, -73');
    const call = client.listFeatures(rectangle);

    call.on('data', (feature) => {
      console.log(
        'Found feature called "' +
          feature.name +
          '" at ' +
          feature.location.latitude / COORD_FACTOR +
          ', ' +
          feature.location.longitude / COORD_FACTOR
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

        const feature_list = JSON.parse(data);
        const num_points = 10;

        const call = client.recordRoute((error, stats) => {
          if (error) {
            console.log('error', error.message);
          }

          console.log('Finished trip with', stats.point_count, 'points');
          console.log('Passed', stats.feature_count, 'features');
          console.log('Travelled', stats.distance, 'meters');
          console.log('It took', stats.elapsed_time, 'seconds');
          resolve();
        });

        for (let i = 0; i < num_points; i++) {
          const rand_point =
            feature_list[Math.floor(Math.random() * feature_list.length)];

          console.log(
            'Visiting point ' +
              rand_point.location.latitude / COORD_FACTOR +
              ', ' +
              rand_point.location.longitude / COORD_FACTOR
          );
          call.write({
            latitude: rand_point.location.latitude,
            longitude: rand_point.location.longitude,
          });
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
          note.message +
          '" at ' +
          note.location.latitude +
          ', ' +
          note.location.longitude
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
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      console.log(
        'Sending message "' +
          note.message +
          '" at ' +
          note.location.latitude +
          ', ' +
          note.location.longitude
      );
      call.write(note);
    }

    call.end();
  });
}

/**
 * Run all of the demos in order
 */
async function main() {
  const point1 = {
    latitude: 409146138,
    longitude: -746188906,
  };
  await runGetFeature(point1);

  const point2 = {
    latitude: 0,
    longitude: 0,
  };
  await runGetFeature(point2);

  await runListFeatures();
  await runRecordRoute();
  await runRouteChat();

  console.log('THE END');
}

if (require.main === module) {
  main();
}
