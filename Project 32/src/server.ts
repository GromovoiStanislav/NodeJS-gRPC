import * as grpc from '@grpc/grpc-js';
import greeterHandler from './handlers/greeter';
import { ILogger } from './components/interfaces/logger.interface';

type StartServerType = (
  port: string | number,
  logger: Console | ILogger
) => void;

export const startServer: StartServerType = (port, logger): void => {
  // create a new gRPC server
  const server: grpc.Server = new grpc.Server();

  // register all the handler here...
  server.addService(greeterHandler.service, greeterHandler.handler);

  // define the host/port for server
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err: Error, port: number) => {
      if (err != null) {
        return logger.error(err);
      }
      logger.log(`gRPC listening on ${port}`);
      // start the gRPC server
      server.start();
    }
  );
};
