const messages = require('./posts_service_pb');
const services = require('./posts_service_grpc_pb');
const grpc = require('@grpc/grpc-js');

function main() {
  const client = new services.PostServiceClient(
    'localhost:10000',
    grpc.credentials.createInsecure()
  );
  const request = new messages.Empty();

  client.getPosts(request, (err, response) => {
    response.getPostsList().forEach((element) => {
      console.log(
        'ID:',
        element.getId(),
        'Title:',
        element.getTitle(),
        'Text:',
        element.getText()
      );
    });
  });
}

main();
