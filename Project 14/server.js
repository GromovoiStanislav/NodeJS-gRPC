const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'chat.proto'),
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
const { chat_service_package } = grpc.loadPackageDefinition(packageDefinition);

// Список активных клиентских потоков
const clients = [];

// Реализация методов сервера
const server = new grpc.Server();
server.addService(chat_service_package.ChatService.service, {
  SendMessage: (call, callback) => {
    const message = call.request;

    console.log(
      `Received message from ${message.username}: ${message.message}`
    );

    // Рассылка сообщения всем активным клиентам
    clients.forEach((client) => {
      client.write(message);
    });

    callback(null, {});
  },
  ReceiveMessage: (call) => {
    // Добавление клиентского потока в список активных клиентов
    clients.push(call);

    // Удаление клиентского потока из списка активных клиентов при завершении
    call.on('end', () => {
      const index = clients.indexOf(call);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
  },
});

// Запуск сервера
const PORT = '50051';
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
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
