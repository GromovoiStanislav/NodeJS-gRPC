"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const grpc = require("@grpc/grpc-js");
const greeter_1 = require("./handlers/greeter");
const startServer = (port, logger) => {
    // create a new gRPC server
    const server = new grpc.Server();
    // register all the handler here...
    server.addService(greeter_1.default.service, greeter_1.default.handler);
    // define the host/port for server
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err != null) {
            return logger.error(err);
        }
        logger.log(`gRPC listening on ${port}`);
        // start the gRPC server
        server.start();
    });
};
exports.startServer = startServer;
