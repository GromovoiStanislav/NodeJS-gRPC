// package: greeter
// file: greeter.proto

import * as grpc from '@grpc/grpc-js';
import * as greeter_pb from './greeter_pb';

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: IGreeterService_ISayHello;
}

interface IGreeterService_ISayHello extends grpc.MethodDefinition<greeter_pb.HelloRequest, greeter_pb.HelloResponse> {
  path: '/greeter.Greeter/SayHello'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<greeter_pb.HelloRequest>;
  requestDeserialize: grpc.deserialize<greeter_pb.HelloRequest>;
  responseSerialize: grpc.serialize<greeter_pb.HelloResponse>;
  responseDeserialize: grpc.deserialize<greeter_pb.HelloResponse>;
}

export const GreeterService: IGreeterService;
export interface IGreeterServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<greeter_pb.HelloRequest, greeter_pb.HelloResponse>;
}

export interface IGreeterClient {
  sayHello(request: greeter_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: greeter_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  sayHello(request: greeter_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: greeter_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  sayHello(request: greeter_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: greeter_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public sayHello(request: greeter_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: greeter_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  public sayHello(request: greeter_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: greeter_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  public sayHello(request: greeter_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: greeter_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}

