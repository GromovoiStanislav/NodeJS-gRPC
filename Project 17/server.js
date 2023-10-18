const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const parseArgs = require('minimist');

const PROTO_PATH = __dirname + '/helloworld.proto';

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  if (call.request.name === '') {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: 'request missing required field: name',
    });
  }
  callback(null, { message: 'Hello ' + call.request.name });
}

const REPLY_COUNT = 5;

function sayHelloStreamReply(call) {
  if (call.request.name === '') {
    call.emit('error', {
      code: grpc.status.INVALID_ARGUMENT,
      details: 'request missing required field: name',
    });
  } else {
    for (let i = 0; i < REPLY_COUNT; i++) {
      call.write({ message: 'Hello ' + call.request.name });
    }
    call.end();
  }
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'port',
    default: { port: '50052' },
  });

  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {
    sayHello: sayHello,
    sayHelloStreamReply: sayHelloStreamReply,
  });
  server.bindAsync(
    `0.0.0.0:${argv.port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
