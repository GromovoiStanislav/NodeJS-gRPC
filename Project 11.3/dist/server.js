import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 50051;
const PROTO_FILE = '../protos/example.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const { example } = grpc.loadPackageDefinition(packageDef);
function main() {
    const server = getServer();
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Your server as started on port ${port}`);
        server.start();
    });
}
function getServer() {
    const server = new grpc.Server();
    // @ts-ignore
    server.addService(example.MyService.service, {
        DoSomething: (req, res) => {
            console.log('DoSomething:', req.request);
            res(null, {
                name: 'Tom',
                age: 30,
            });
        },
    });
    return server;
}
main();
