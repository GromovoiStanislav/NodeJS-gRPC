"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("@grpc/grpc-js");
const greeter_grpc_pb_1 = require("./generated/greeter_grpc_pb");
const greeter_pb_1 = require("./generated/greeter_pb");
const client = new greeter_grpc_pb_1.GreeterClient('localhost:50051', grpc.credentials.createInsecure());
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
};
const SayHello = (name) => {
    return new Promise((resolve, reject) => {
        const request = new greeter_pb_1.HelloRequest();
        request.setName(name);
        client.sayHello(request, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(data.getMessage());
            resolve(null);
        });
    });
};
const main = async () => {
    await SayHello('Tom');
    await delay(1000);
    await SayHello('Toma');
    await delay(1000);
    await SayHello('Tomas');
};
main();
