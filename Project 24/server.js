const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ReflectionService } = require('@grpc/reflection');
const path = require('node:path');

const proto = protoLoader.loadSync(
  path.join(__dirname, './protos/posts_service.proto')
);
const definition = grpc.loadPackageDefinition(proto);

// Create the reflection implementation based on your gRPC package and add it to your existing server

const reflection = new ReflectionService(proto);

const postList = [
  { id: 1, title: 'titulo', text: 'blablabla blabla bla' },
  { id: 2, title: 'titulo 2', text: 'blablabla blabla bla' },
];

const getPosts = (call, callback) => {
  callback(null, { posts: postList });
};

const server = new grpc.Server();
reflection.addToServer(server);

server.addService(definition.posts.PostService.service, { getPosts });

const serverUrl = 'localhost:10000';
server.bindAsync(serverUrl, grpc.ServerCredentials.createInsecure(), (port) => {
  console.log('Server running on', serverUrl);
  server.start();
});
