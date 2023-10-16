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

const STREAMING_COUNT = 10;

function unaryEcho(call, callback) {
  console.log('--- UnaryEcho ---');

  const incomingTimestamps = call.metadata.get('timestamp');
  if (incomingTimestamps.length > 0) {
    console.log('Timestamp from metadata:');
    for (const [index, value] of incomingTimestamps.entries()) {
      console.log(` ${index}. ${value}`);
    }
  }

  const outgoingHeaders = new grpc.Metadata();
  outgoingHeaders.set('location', 'MTV');
  outgoingHeaders.set('timestamp', new Date().toISOString());
  call.sendMetadata(outgoingHeaders);

  const outgoingTrailers = new grpc.Metadata();
  outgoingTrailers.set('timestamp', new Date().toISOString());

  console.log(`Request received ${JSON.stringify(call.request)}, sending echo`);
  callback(null, call.request, outgoingTrailers);
}

function serverStreamingEcho(call) {
  console.log('--- ServerStreamingEcho ---');

  const incomingTimestamps = call.metadata.get('timestamp');
  if (incomingTimestamps.length > 0) {
    console.log('Timestamp from metadata:');
    for (const [index, value] of incomingTimestamps.entries()) {
      console.log(` ${index}. ${value}`);
    }
  }

  const outgoingHeaders = new grpc.Metadata();
  outgoingHeaders.set('location', 'MTV');
  outgoingHeaders.set('timestamp', new Date().toISOString());
  call.sendMetadata(outgoingHeaders);

  console.log(`Request received ${JSON.stringify(call.request)}`);
  for (let i = 0; i < STREAMING_COUNT; i++) {
    console.log(`Echo message ${JSON.stringify(call.request)}`);
    call.write(call.request);
  }

  const outgoingTrailers = new grpc.Metadata();
  outgoingTrailers.set('timestamp', new Date().toISOString());
  call.end(outgoingTrailers);
}

function clientStreamingEcho(call, callback) {
  console.log('--- ClientStreamingEcho ---');

  const incomingTimestamps = call.metadata.get('timestamp');
  if (incomingTimestamps.length > 0) {
    console.log('Timestamp from metadata:');
    for (const [index, value] of incomingTimestamps.entries()) {
      console.log(` ${index}. ${value}`);
    }
  }

  const outgoingHeaders = new grpc.Metadata();
  outgoingHeaders.set('location', 'MTV');
  outgoingHeaders.set('timestamp', new Date().toISOString());
  call.sendMetadata(outgoingHeaders);

  let lastReceivedMessage = '';
  call.on('data', (value) => {
    console.log(`Received request ${JSON.stringify(value)}`);
    lastReceivedMessage = value.message;
  });
  call.on('end', () => {
    const outgoingTrailers = new grpc.Metadata();
    outgoingTrailers.set('timestamp', new Date().toISOString());
    callback(null, { message: lastReceivedMessage }, outgoingTrailers);
  });
}

function bidirectionalStreamingEcho(call) {
  console.log('--- BidirectionalStreamingEcho ---');

  const incomingTimestamps = call.metadata.get('timestamp');
  if (incomingTimestamps.length > 0) {
    console.log('Timestamp from metadata:');
    for (const [index, value] of incomingTimestamps.entries()) {
      console.log(` ${index}. ${value}`);
    }
  }

  const outgoingHeaders = new grpc.Metadata();
  outgoingHeaders.set('location', 'MTV');
  outgoingHeaders.set('timestamp', new Date().toISOString());
  call.sendMetadata(outgoingHeaders);

  call.on('data', (value) => {
    console.log(`Request received ${JSON.stringify(value)}, sending echo`);
    call.write(value);
  });

  call.on('end', () => {
    const outgoingTrailers = new grpc.Metadata();
    outgoingTrailers.set('timestamp', new Date().toISOString());
    call.end(outgoingTrailers);
  });
}

const serviceImplementation = {
  unaryEcho,
  serverStreamingEcho,
  clientStreamingEcho,
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
