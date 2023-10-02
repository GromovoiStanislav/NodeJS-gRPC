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

// Создание клиента gRPC
const client = new chat_service_package.ChatService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const sendMessage = (username, message) => {
  const newMessage = {
    username,
    message,
  };

  // Отправить сообщение
  client.SendMessage(newMessage, (error, response) => {
    if (!error) {
      console.log('Message sent successfully');
    } else {
      console.error(error);
    }
  });
};

const receiveMessages = () => {
  // Принять сообщения (подписаться на поток сообщений)
  const receiveStream = client.ReceiveMessage({});

  receiveStream.on('data', (message) => {
    console.log(
      `Received message from ${message.username}: ${message.message}`
    );
  });
};

receiveMessages();
setTimeout(sendMessage, 500, 'User1', 'Hello, chat!');
setTimeout(sendMessage, 1000, 'User1', 'Message 1');
setTimeout(sendMessage, 1500, 'User1', 'Message 2');
setTimeout(sendMessage, 2000, 'User1', 'Message 3');
