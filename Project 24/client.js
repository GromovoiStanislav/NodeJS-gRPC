const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('node:path');

const proto = protoLoader.loadSync(
  path.join(__dirname, './protos/posts_service.proto')
);
const definition = grpc.loadPackageDefinition(proto);

const serverUrl = 'localhost:10000';

const client = new definition.posts.PostService(
  serverUrl,
  grpc.credentials.createInsecure()
);

client.getPosts({}, (error, response) => {
  if (!error) {
    console.log(response);
  } else {
    console.error(error);
  }
});
