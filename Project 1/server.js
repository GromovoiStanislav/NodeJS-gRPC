const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const todos = [];

function createTodo(call, callback) {
  console.log('Received from client ' + JSON.stringify(call.request));
  const newTodoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(newTodoItem);
  callback(null, newTodoItem);
}

function readTodosStream(call, callback) {
  todos.forEach((t) => call.write(t));
  call.end();
}

function readTodos(call, callback) {
  callback(null, { items: todos });
}

const server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

server.bindAsync(
  '0.0.0.0:40000',
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    server.start();
    console.log(`listining on ${port}`);
  }
);
