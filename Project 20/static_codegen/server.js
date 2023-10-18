const messages = require('./helloworld_pb');
const services = require('./helloworld_grpc_pb');
const parseArgs = require('minimist');

const grpc = require('@grpc/grpc-js');

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  const reply = new messages.HelloReply();
  reply.setMessage('Hello ' + call.request.getName());
  callback(null, reply);
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

  const server = new grpc.Server();
  server.addService(services.GreeterService, { sayHello: sayHello });
  server.bindAsync(
    `0.0.0.0:${argv.port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
