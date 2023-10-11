import * as grpc from '@grpc/grpc-js';
import { example } from './example.js'; // Импортируйте сгенерированный протокол
class MyServiceImplementation {
    DoSomething(call, callback) {
        const request = call.request; // Получение запроса от клиента
        // Ваша логика обработки запроса
        const response = new example.MyMessage({
            name: `Hello, ${request.name}`,
            age: request.age,
        });
        callback(null, response); // Отправка ответа клиенту
    }
}
const server = new grpc.Server();
server.addService(example.UnimplementedMyServiceService.definition, 
// @ts-ignore
new MyServiceImplementation());
const serverAddress = '0.0.0.0:50051'; // Замените на адрес и порт вашего сервера
server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`Server is running on ${serverAddress}`);
});
