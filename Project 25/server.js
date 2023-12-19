const path = require('node:path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const grpcReflection = require('@grpc/reflection');

const PROTO_PATH = path.join(__dirname, './protos/helloworld.proto');

const server = new grpc.Server();
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition);

const reflection = new grpcReflection.ReflectionService(packageDefinition);
reflection.addToServer(server);

server.addService(proto.helloworld.Greeter.service, {
  sayHello: (call, callback) => {
    callback(null, { message: 'Hello' });
  },

  sayHelloStreamReply: (call) => {
    if (call.request.name === '') {
      call.emit('error', {
        code: grpc.status.INVALID_ARGUMENT,
        details: 'request missing required field: name',
      });
    } else {
      for (let i = 0; i < 5; i++) {
        call.write({ message: 'Hello ' + call.request.name });
      }
      call.end();
    }
  },
});

server.bindAsync(
  'localhost:5000',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
