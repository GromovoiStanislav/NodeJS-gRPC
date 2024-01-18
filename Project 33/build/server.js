"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
// load grpc
const PROTO_PATH = __dirname + '/../protos/calculator.proto';
const packageDefinition = (0, proto_loader_1.loadSync)(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const calc_proto = (0, grpc_js_1.loadPackageDefinition)(packageDefinition).calculator;
// implement the add method
const addNums = (call, callback) => {
    const { num1, num2 } = call.request;
    const api_key = call.metadata.get('x-api-key');
    // check api key
    const expected_api_key = process.env.API_KEY || '12345';
    if (api_key.length === 0 || api_key[0] !== expected_api_key) {
        return callback({
            code: grpc_js_1.status.UNAUTHENTICATED,
            details: 'Unauthorized',
        });
    }
    callback(null, { num: num1 + num2 });
};
const main = async () => {
    const server = new grpc_js_1.Server();
    server.addService(calc_proto.Calculator.service, { addNums });
    const port = process.env.PORT || 50051;
    server.bindAsync('0.0.0.0:' + port, grpc_js_1.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('server running on port', port);
    });
};
main();
