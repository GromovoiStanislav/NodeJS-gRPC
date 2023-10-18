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

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'target',
    default: { target: 'localhost:50052' },
  });

  const client = new echoProto.Echo(
    argv.target,
    grpc.credentials.createInsecure()
  );

  const call = client.bidirectionalStreamingEcho();

  const EXPECTED_MESSAGES = 2;
  let receivedMessages = 0;

  call.on('data', (value) => {
    console.log(`received message "${value.message}"`);
    receivedMessages += 1;
    if (receivedMessages >= EXPECTED_MESSAGES) {
      console.log('cancelling call');
      call.cancel();
    }
  });

  call.on('status', (statusObject) => {
    console.log(
      `received call status with code ${grpc.status[statusObject.code]}`
    );
  });

  call.on('error', (error) => {
    console.log(`received error ${error}`);
  });

  console.log('sending message "One"');
  call.write({ message: 'One' });

  console.log('sending message "Two"');
  call.write({ message: 'Two' });

  console.log('sending message "Three"');
  call.write({ message: 'Three' });

  console.log('sending message "Four"');
  call.write({ message: 'Four' });

  console.log('sending message "Five"');
  call.write({ message: 'Five' });
}

main();
