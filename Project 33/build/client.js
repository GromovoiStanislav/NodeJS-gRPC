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
const main = async () => {
    const target = process.env.TARGET || 'localhost:50051';
    const client = new calc_proto.Calculator(target, grpc_js_1.credentials.createInsecure());
    // setup metadata
    const metadata = new grpc_js_1.Metadata();
    const api_key = process.env.API_KEY || '12345';
    metadata.add('x-api-key', api_key);
    // make call every 5 seconds
    setInterval(() => {
        // generate 2 random numbers between 1 and 1000
        const nums = {
            num1: Math.floor(Math.random() * 1000) + 1,
            num2: Math.floor(Math.random() * 1000) + 1,
        };
        client.addNums(nums, metadata, (err, response) => {
            if (err) {
                console.log('error:', err.details);
            }
            else {
                console.log('addNums response: ', response);
            }
        });
    }, 1000);
};
main();
