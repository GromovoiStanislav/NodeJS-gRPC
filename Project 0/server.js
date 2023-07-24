const {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'file.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    //includeDirs: [__dirname],
  }
);

// Загрузка gRPC пакета определения
const { your_service_package } = loadPackageDefinition(packageDefinition);

// Реализация методов сервера
const server = new Server();
server.addService(your_service_package.YourService.service, {
  sayHello: (call, callback) => {
    const name = call.request.name;
    const response = `Hello, ${name}!`;
    callback(null, { message: response });
  },
});

// Запуск сервера
const PORT = '50051';
server.bindAsync(
  `0.0.0.0:${PORT}`,
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      server.start();
    }
  }
);
