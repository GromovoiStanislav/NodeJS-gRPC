/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "example";

export interface MyMessage {
  name: string;
  age: number;
}

function createBaseMyMessage(): MyMessage {
  return { name: "", age: 0 };
}

export const MyMessage = {
  encode(message: MyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MyMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMyMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MyMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      age: isSet(object.age) ? globalThis.Number(object.age) : 0,
    };
  },

  toJSON(message: MyMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MyMessage>, I>>(base?: I): MyMessage {
    return MyMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MyMessage>, I>>(object: I): MyMessage {
    const message = createBaseMyMessage();
    message.name = object.name ?? "";
    message.age = object.age ?? 0;
    return message;
  },
};

export interface MyService {
  DoSomething(request: MyMessage): Promise<MyMessage>;
}

export const MyServiceServiceName = "example.MyService";
export class MyServiceClientImpl implements MyService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MyServiceServiceName;
    this.rpc = rpc;
    this.DoSomething = this.DoSomething.bind(this);
  }
  DoSomething(request: MyMessage): Promise<MyMessage> {
    const data = MyMessage.encode(request).finish();
    const promise = this.rpc.request(this.service, "DoSomething", data);
    return promise.then((data) => MyMessage.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
