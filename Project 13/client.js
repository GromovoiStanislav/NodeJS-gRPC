const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'auth.proto'),
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
const { auth_service_package } = grpc.loadPackageDefinition(packageDefinition);

// Создание клиента gRPC
const client = new auth_service_package.AuthService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const signUp = () => {
  client.SignUp({ username: 'Tom', password: '123' }, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(response.code, response.details);
  });
};

let JWT = '';

const signIn = () => {
  client.SignIn({ username: 'Tom', password: '123' }, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }

    if (response.code !== 'OK') {
      console.log(response.code, response.details);
    } else {
      console.log('Logged in successfully!');
      console.log('JWT token:', response.details);
      JWT = response.details;
    }
  });
};

const getMe = () => {
  // Создаем метаданные с JWT токеном
  const metadata = new grpc.Metadata();
  metadata.add('authorization', `Bearer ${JWT}`);

  client.GetMe({}, metadata, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }

    if (response.code !== 'OK') {
      console.log(response.code, response.details);
    } else {
      console.log('username:', response.details);
      JWT = response.jwt;
    }
  });
};

/////
signUp();
setTimeout(signIn, 1000);
setTimeout(getMe, 2000);
