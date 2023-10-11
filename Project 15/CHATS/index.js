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

const server = new grpc.Server();
server.addService(auth_service_package.AuthRpc.service, {
  // Реализация методов сервера
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
      error.code = grpc.status.ALREADY_EXISTS;
      callback(error);
      return;
    }

    /// Создание нового пользователя
    try {
      const newUser = await usersService.createUser({
        username,
        email: utils.encryptEmail(email),
        password: await utils.hashPassword(password),
      });

      /// Генерация токенов
      callback(null, utils.createTokens(newUser.id));
    } catch {
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },

  SignIn: async (call, callback) => {
    const { email, password } = call.request;

    /// Проверка на пустые поля
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

    /// Проверка, что пользователь существует
    const user = await usersService.findUser(utils.encryptEmail(email));
    if (!user) {
      const error = new Error('User not found');
      error.code = grpc.status.NOT_FOUND;
      callback(error);
      return;
    }

    /// Проверка пароля
    try {
      if (await utils.verifyPassword(user.password, password)) {
        /// Генерация токенов
        callback(null, utils.createTokens(user.id));
      } else {
        throw new Error();
      }
    } catch {
      const error = new Error('Unauthenticated');
      error.code = grpc.status.UNAUTHENTICATED;
      callback(error);
      return;
    }
  },

  RefreshToken: async (call, callback) => {
    const { refresh_token } = call.request;

    /// Проверка на пустые поля
    if (!refresh_token) {
      const error = new Error('Refresh token not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const user_id = utils.verifyToken(refresh_token, true).user_id;

      /// Проверка, что пользователь существует
      const user = await usersService.getUserByID(user_id);
      if (!user) {
        const error = new Error('User not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }

      /// Генерация токенов
      callback(null, utils.createTokens(user.id));
    } catch {
      const error = new Error('Unauthenticated');
      error.code = grpc.status.UNAUTHENTICATED;
      callback(error);
      return;
    }
  },

  FetchUser: async (call, callback) => {
    const access_token = call.metadata.get('access_token')[0] ?? '';

    /// Проверка на пустые поля
    if (!access_token) {
      const error = new Error('Access token not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const user_id = utils.verifyToken(access_token).user_id;

      /// Проверка, что пользователь существует
      const user = await usersService.getUserByID(user_id);
      if (!user) {
        const error = new Error('User not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }

      /// Ответ
      callback(null, {
        id: user.id,
        username: user.username,
        email: utils.decryptEmail(user.email),
      });
    } catch {
      const error = new Error('Unauthenticated');
      error.code = grpc.status.UNAUTHENTICATED;
      callback(error);
      return;
    }
  },

  UpdateUser: async (call, callback) => {
    const access_token = call.metadata.get('access_token')[0] ?? '';

    /// Проверка на пустые поля
    if (!access_token) {
      const error = new Error('Access token not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const user_id = utils.verifyToken(access_token).user_id;

      /// Собираем данные для обновления
      const { username, email, password } = call.request;

      const data = {};

      if (username) {
        data.username = username;
      }
      if (email) {
        data.email = utils.encryptEmail(email);
      }
      if (password) {
        data.password = await utils.hashPassword(password);
      }

      const user = await usersService.updateUser(user_id, data);

      /// Ответ
      callback(null, {
        id: user.id,
        username: user.username,
        email: utils.decryptEmail(user.email),
      });
    } catch {
      const error = new Error('Unauthenticated');
      error.code = grpc.status.UNAUTHENTICATED;
      callback(error);
      return;
    }
  },

  DeleteUser: async (call, callback) => {
    const access_token = call.metadata.get('access_token')[0] ?? '';

    /// Проверка на пустые поля
    if (!access_token) {
      const error = new Error('Access token not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const user_id = utils.verifyToken(access_token).user_id;

      try {
        /// Удалим пользователя
        await usersService.deleteUserByID(user_id);

        /// Ответ
        callback(null, {
          message: 'Deleted',
        });
      } catch {
        const error = new Error('User not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }
    } catch {
      const error = new Error('Unauthenticated');
      error.code = grpc.status.UNAUTHENTICATED;
      callback(error);
      return;
    }
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
