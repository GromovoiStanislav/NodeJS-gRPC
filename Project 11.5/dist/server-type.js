import * as grpc from '@grpc/grpc-js';
import { Response, UnimplementedExampleService, } from './types/type.js';
const server = new grpc.Server();
const port = 9090;
const host = '0.0.0.0';
async function main() {
    const serviceImpl = {
        add: (call, callback) => {
            const a = call.request?.a;
            const b = call.request?.b;
            callback(null, new Response({ result: a + b }));
        },
    };
    server.addService(UnimplementedExampleService.definition, serviceImpl);
    server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        server.start();
        console.log('server running on port', port);
    });
}
main();
