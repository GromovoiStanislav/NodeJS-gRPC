const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const parseArgs = require('minimist');

const PROTO_PATH = __dirname + '/echo.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const echoProto =
  grpc.loadPackageDefinition(packageDefinition).grpc.examples.echo;

function bidirectionalStreamingEcho(call) {
  call.on('data', (value) => {
    const message = value.message;
    console.log(`echoing message "${message}"`);
    call.write({ message: message });
  });

  // Either 'end' or 'cancelled' will be emitted when the call is cancelled
  call.on('end', () => {
    console.log('server received end event');
    call.end();
  });

  call.on('cancelled', () => {
    console.log('server received cancelled event');
  });
}

const serviceImplementation = {
  bidirectionalStreamingEcho,
};

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'port',
    default: { port: '50052' },
  });

  const server = new grpc.Server();

  server.addService(echoProto.Echo.service, serviceImplementation);

  server.bindAsync(
    `0.0.0.0:${argv.port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
