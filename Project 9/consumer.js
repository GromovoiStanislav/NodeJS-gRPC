const {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'message.proto'),
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
const { pusher_service_package } = loadPackageDefinition(packageDefinition);

// Реализация методов сервера
const server = new Server();
server.addService(pusher_service_package.PusherService.service, {
  SendMessage: (call, callback) => {
    const message = call.request.message;
    console.log('Message received:', message);
    //callback(null, {});
  },

  SendMessageStream: (call, callback) => {
    call.on('data', (chunk) => {
      const message = chunk.message;
      console.log('Message received:', message);

      call.write({ status: 'OK' });
    });

    call.on('end', () => {
      //callback(null, {});
    });
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
      console.log('[x] To exit press CTRL+C');
    }
  }
);
