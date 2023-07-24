const { loadPackageDefinition, credentials } = require('@grpc/grpc-js');
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

// Создание клиента gRPC
const client = new your_service_package.YourService(
  'localhost:50051',
  credentials.createInsecure()
);

// Вызов метода сервера
const name = 'John Doe';
client.sayHello({ name }, (err, response) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Response:', response.message);
});
