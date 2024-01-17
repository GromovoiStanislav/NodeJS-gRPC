"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greeter_pb_1 = require("../generated/greeter_pb");
const greeter_grpc_pb_1 = require("../generated/greeter_grpc_pb");
class GreeterHandler {
    sayHello = (call, callback) => {
        const reply = new greeter_pb_1.HelloResponse();
        reply.setMessage(`Hello, ${call.request.getName()}`);
        callback(null, reply);
    };
}
const serviceImpl = {
    sayHello: (call, callback) => {
        const reply = new greeter_pb_1.HelloResponse();
        reply.setMessage(`Hello, ${call.request.getName()}`);
        callback(null, reply);
    },
};
exports.default = {
    service: greeter_grpc_pb_1.GreeterService, // Service interface
    //handler: serviceImpl, // Service interface definitions
    handler: new GreeterHandler(), // Service interface definitions
};
