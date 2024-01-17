import * as grpc from '@grpc/grpc-js';

import { GreeterClient } from './generated/greeter_grpc_pb';
import { HelloRequest, HelloResponse } from './generated/greeter_pb';

const client = new GreeterClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};

const SayHello = (name: string) => {
  return new Promise((resolve, reject) => {
    const request = new HelloRequest();
    request.setName(name);

    client.sayHello(request, (err, data: HelloResponse) => {
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
