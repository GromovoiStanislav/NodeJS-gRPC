import 'dotenv/config.js';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import usersService from './users/index.js';
import utils from './utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, './proto/auth.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

// Загрузка gRPC пакета определения
const { auth_service_package } = grpc.loadPackageDefinition(packageDefinition);

// Реализация методов сервера
const server = new grpc.Server();
server.addService(auth_service_package.AuthRpc.service, {
  SignUp: async (call, callback) => {
    const { username, email, password } = call.request;

    /// Проверка на пустые поля
    if (!username) {
      const error = new Error('Username not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    if (!email) {
      const error = new Error('Email not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    if (!password) {
      const error = new Error('Password not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    /// Проверка, что пользователь с таким именем не существует
    if (await usersService.findUser(username)) {
      const error = new Error('User already exists');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    /// Создание нового пользователя
    const newUser = await usersService.createUser({
      username,
      email: utils.encryptEmail(email),
      password: await utils.hashPassword(password),
    });

    callback(null, {
      access_token: utils.createAccessToken(newUser.id),
      refresh_token: utils.createRefreshToken(newUser.id),
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
      server.start();
      console.log(`Server running at grpc://0.0.0.0:${PORT}`);
      console.log('[x] To exit press CTRL+C');
    }
  }
);