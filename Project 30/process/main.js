const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('node:path');

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '../protos/processing.proto')
);
const processingProto = grpc.loadPackageDefinition(packageDefinition);

const process = (call) => {
  const onboardRequest = call.request;
  const time = onboardRequest.orderId * 1000 + onboardRequest.degreeId * 10;

  call.write({ status: 0 });

  call.write({ status: 1 });

  setTimeout(() => {
    call.write({ status: 2 });

    setTimeout(() => {
      call.write({ status: 3 });
      call.end();
    }, time);
  }, time);
};

const server = new grpc.Server();
server.addService(processingProto.Processing.service, { process });
server.bindAsync(
  '0.0.0.0:50052',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
