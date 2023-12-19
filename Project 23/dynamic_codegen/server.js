const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('node:path');

const proto = protoLoader.loadSync(
  path.join(__dirname, '/../protos/posts_service.proto')
);
const definition = grpc.loadPackageDefinition(proto);

const postList = [
  { id: 1, title: 'titulo', text: 'blablabla blabla bla' },
  { id: 2, title: 'titulo 2', text: 'blablabla blabla bla' },
];

const getPosts = (call, callback) => {
  callback(null, { posts: postList });
};

const serverUrl = 'localhost:10000';
const server = new grpc.Server();

server.addService(definition.posts.PostService.service, { getPosts });

server.bindAsync(serverUrl, grpc.ServerCredentials.createInsecure(), (port) => {
  console.log('Server running on', serverUrl);
  server.start();
});
