import { createHash } from "node:crypto";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { GenerateHashRequest, GenerateHashResponse } from "./proto/app";


@Controller()
export class AppController {

  @GrpcMethod("TaskService", "GenerateHash")
  generateHash(request: GenerateHashRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): GenerateHashResponse {


    console.log(metadata);
    console.log('api-key: ', metadata.get('api-key')[0]);

    const hash = createHash("sha256").update(request.data).digest("hex");

    const serverMetadata = new Metadata();
    serverMetadata.add("X-Set-Cookie", "yummy_cookie=choco");
    call.sendMetadata(serverMetadata);

    return {
      id: request.id,
      hash
    };
  }
}