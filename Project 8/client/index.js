const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
const path = require('node:path');
const protoFileName = './proto/task.proto';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, protoFileName),
  {}
);
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.task.TaskService(
  '0.0.0.0:50051',
  grpc.credentials.createInsecure()
);

const requestMetadata = new grpc.Metadata();
requestMetadata.set('api-key', 'df1546dfd54654sdf65465dfgd465');

const call = client.GenerateHash(
  { id: '2', data: 'Мой текст' },
  requestMetadata,
  (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response from server: ' + JSON.stringify(response));
  }
);

call.on('metadata', (metadata) => {
  console.log('metadata ', metadata);
  console.log('x-set-cookie: ', metadata.get('x-set-cookie')[0]);
});
