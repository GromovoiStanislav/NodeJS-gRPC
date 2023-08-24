import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from "./app/app.module";


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: 'task',
        protoPath: join(__dirname, './app/proto/app.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();