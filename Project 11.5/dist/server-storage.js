import * as grpc from '@grpc/grpc-js';
import { UnimplementedStorageService, Object } from './types/storage.js';
class Storage extends UnimplementedStorageService {
    get(call, callback) {
        console.log(call.request.id);
        callback(null, new Object({ name: call.request.id }));
    }
}
const server = new grpc.Server();
server.addService(UnimplementedStorageService.definition, new Storage());
server.bindAsync('0.0.0.0:4884', grpc.ServerCredentials.createInsecure(), () => server.start());
