const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const jwt = require('jsonwebtoken');

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

// Массив для хранения пользователей (для упрощения)
const users = [];
const secretKey = 'secret-key';

// Реализация методов сервера
const server = new grpc.Server();
server.addService(auth_service_package.AuthService.service, {
  SignUp: (call, callback) => {
    const { username, password } = call.request;

    // Проверка, что пользователь с таким именем не существует
    if (users.find((user) => user.username === username)) {
      callback(null, {
        code: 'ALREADY_EXISTS',
        details: 'User with this username already exists',
      });
      return;
    }

    // Создание нового пользователя
    const newUser = { username, password };
    users.push(newUser);

    callback(null, {
      code: 'OK',
      details: 'User registered successfully',
    });
  },

  SignIn: (call, callback) => {
    const { username, password } = call.request;

    // Поиск пользователя в массиве (для упрощения)
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      callback(null, {
        code: 'NOT_FOUND',
        details: 'User not found or incorrect credentials',
      });
      return;
    }

    // Генерация JWT для успешной аутентификации
    const jwtToken = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    callback(null, {
      code: 'OK',
      details: jwtToken,
    });
  },

  GetMe: (call, callback) => {
    authenticateJWT(call, callback, () => {
      callback(null, { code: 'OK', details: call.user });
    });
  },
});

function authenticateJWT(call, callback, next) {
  let token = call.metadata.get('authorization')[0];

  if (!token) {
    const error = {
      code: grpc.status.UNAUTHENTICATED,
      details: 'Unauthorized',
    };
    return callback(null, error);
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      const error = {
        code: grpc.status.UNAUTHENTICATED,
        details: 'Unauthorized',
      };
      return callback(null, error);
    }

    call.user = user.username; // Сохраняем информацию о пользователе (полезная нагрузка из JWT)
    next();
  });
}

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
