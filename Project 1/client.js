const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
console.log('text', text);

const client = new todoPackage.Todo(
  'localhost:40000',
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    console.log('Created new item ' + JSON.stringify(response));
  }
);

client.readTodos(null, (err, response) => {
  console.log(
    'Recieved all todos from server ' + JSON.stringify(response, null, 2)
  );
  if (response.items) {
    response.items.forEach((item) => console.log(item));
  }
});

const call = client.readTodosStream();
call.on('data', (item) => {
  console.log('Recieved item from server ' + JSON.stringify(item));
});

call.on('end', (e) => console.log('server done!'));
