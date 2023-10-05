import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

// Создание клиента gRPC
const client = new auth_service_package.AuthRpc(
  '0.0.0.0:50051',
  grpc.credentials.createInsecure()
);

const signUp = () => {
  client.SignUp(
    { username: 'Tom', email: 'tom@mail.com', password: '123' },
    (err, response) => {
      if (err) {
        console.log(err.details);
        return;
      }
      console.log(response);
    }
  );
};

/////
signUp();
