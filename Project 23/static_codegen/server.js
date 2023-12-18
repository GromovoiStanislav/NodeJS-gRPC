const messages = require('./posts_service_pb');
const services = require('./posts_service_grpc_pb');
const grpc = require('@grpc/grpc-js');

const postList = [
  { id: 1, title: 'titulo', text: 'blablabla blabla bla' },
  { id: 2, title: 'titulo 2', text: 'blablabla blabla bla' },
];

/**
 * Implements the GetPosts RPC method.
 */
function getPosts(call, callback) {
  const reply = new messages.PostList();

  const postMessages = postList.map((postData) => {
    const postMessage = new messages.Post();
    postMessage.setId(postData.id);
    postMessage.setTitle(postData.title);
    postMessage.setText(postData.text);
    return postMessage;
  });

  reply.setPostsList(postMessages);
  callback(null, reply);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();
  server.addService(services.PostServiceService, { getPosts: getPosts });
  server.bindAsync(
    'localhost:10000',
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log('Server running on', 'localhost:10000');
      server.start();
    }
  );
}

main();
