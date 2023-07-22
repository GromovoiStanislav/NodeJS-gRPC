const express = require('express');
const app = express();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const grpcServerAddress = 'localhost:40000';

app.use(express.json());

// Endpoint to create a new todo item
app.post('/createTodo', (req, res) => {
	const text = req.body.text;
	const client = new todoPackage.Todo(grpcServerAddress, grpc.credentials.createInsecure());
	client.createTodo(
		{
			text: text,
		},
		(err, response) => {
			if (err) {
				console.error('Error creating todo:', err);
				res.status(500).json({ error: 'Error creating todo' });
			} else {
				console.log('Created new item: ' + JSON.stringify(response));
				res.json(response);
			}
		}
	);
});

// Endpoint to read all todos
app.get('/readTodos', (req, res) => {
	const client = new todoPackage.Todo(grpcServerAddress, grpc.credentials.createInsecure());
	client.readTodos({}, (err, response) => {
		if (err) {
			console.error('Error reading todos:', err);
			res.status(500).json({ error: 'Error reading todos' });
		} else {
			console.log('Received all todos from server:', response);
			res.json(response);
		}
	});
});

// Endpoint to read todos with streaming response
app.get('/readTodosStream', (req, res) => {
	const client = new todoPackage.Todo(grpcServerAddress, grpc.credentials.createInsecure());
	const call = client.readTodosStream({});
	const todos = [];

	call.on('data', (todo) => {
		todos.push(todo);
	});

	call.on('end', () => {
		console.log('Todos stream read successfully:', todos);
		res.json({ items: todos });
	});

	call.on('error', (err) => {
		console.error('Error reading todos stream:', err);
		res.status(500).json({ error: 'Error reading todos stream' });
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Express server listening on http://localhost:${PORT}`);
});
