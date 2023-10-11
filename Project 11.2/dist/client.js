import * as grpc from '@grpc/grpc-js';
import { example } from './example.js'; // Импортируйте сгенерированный протокол
const client = new example.MyServiceClient('0.0.0.0:50051', grpc.credentials.createInsecure());
const request = new example.MyMessage({ name: 'John', age: 30 });
client.DoSomething(request, (error, response) => {
    if (!error) {
        console.log('Server response:', response.toObject());
    }
    else {
        console.error('Error:', error);
    }
});
