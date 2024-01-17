import * as grpc from '@grpc/grpc-js';

import { HelloRequest, HelloResponse } from '../generated/greeter_pb';
import { GreeterService, IGreeterServer } from '../generated/greeter_grpc_pb';

class GreeterHandler implements IGreeterServer {
  [name: string]: grpc.UntypedHandleCall;
  sayHello = (
    call: grpc.ServerUnaryCall<HelloRequest, HelloResponse>,
    callback: grpc.sendUnaryData<HelloResponse>
  ): void => {
    const reply: HelloResponse = new HelloResponse();
    reply.setMessage(`Hello, ${call.request.getName()}`);
    callback(null, reply);
  };
}

const serviceImpl = {
  sayHello: (
    call: grpc.ServerUnaryCall<HelloRequest, HelloResponse>,
    callback: grpc.sendUnaryData<HelloResponse>
  ): void => {
    const reply: HelloResponse = new HelloResponse();
    reply.setMessage(`Hello, ${call.request.getName()}`);
    callback(null, reply);
  },
};

export default {
  service: GreeterService, // Service interface
  //handler: serviceImpl, // Service interface definitions
  handler: new GreeterHandler(), // Service interface definitions
};
