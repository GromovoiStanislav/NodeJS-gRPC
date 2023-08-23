const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/helloworld.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

function sayHelloAgain(call, callback) {
  callback(null, { message: 'Hello again, ' + call.request.name });
}

function sayHelloMany(call, callback) {
  const { names } = call.request;
  const messages = names.map((name) => ({ message: 'Hello ' + name.name }));
  callback(null, { messages: messages });
}

function sayHelloStreamReply(call, callback) {
  const { names } = call.request;
  names.forEach((name) => call.write({ message: 'Hello ' + name.name }));
  call.end();
}

const names = [];
function streamSayHelloReply(call, callback) {
  call.on('data', (chunk) => {
    names.push(chunk);
  });

  call.on('end', () => {
    const messages = names.map((name) => ({ message: 'Hello ' + name.name }));
    names.length = 0;
    callback(null, { messages: messages });
  });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {
    sayHello: sayHello,
    sayHelloAgain: sayHelloAgain,
    sayHelloMany: sayHelloMany,
    sayHelloStreamReply: sayHelloStreamReply,
    streamSayHelloReply: streamSayHelloReply,
  });
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log('Server running at http://0.0.0.0:50051');
    }
  );
}

main();
