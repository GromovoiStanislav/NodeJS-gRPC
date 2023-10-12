import { MyMessage, MyServiceClientImpl } from './example.js';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, '../protos/example.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
// Загрузка gRPC пакета определения
const { example } = grpc.loadPackageDefinition(packageDefinition);
// @ts-ignore
const conn = new example.MyService('0.0.0.0:50051', grpc.credentials.createInsecure());
const sendRequest = (service, method, data) => {
    // Conventionally in gRPC, the request path looks like
    //   "package.names.ServiceName/MethodName",
    // we therefore construct such a string
    const path = `/${service}/${method}`;
    return new Promise((resolve, reject) => {
        // makeUnaryRequest transmits the result (and error) with a callback
        // transform this into a promise!
        const resultCallback = (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        };
        function passThrough(argument) {
            return argument;
        }
        // Using passThrough as the serialize and deserialize functions
        conn.makeUnaryRequest(path, passThrough, passThrough, data, resultCallback);
    });
};
// Создание клиентского экземпляра
const client = new MyServiceClientImpl({ request: sendRequest });
// Функция для вызова DoSomething
async function callMyService() {
    const request = MyMessage.create({
        name: 'John',
        age: 25,
    });
    const response = await client.DoSomething(request);
    console.log('Response:', response);
}
// Вызов функции для выполнения вызова сервиса
callMyService();
