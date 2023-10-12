/* eslint-disable */
import _m0 from 'protobufjs/minimal.js';
export const protobufPackage = 'example';
function createBaseMyMessage() {
  return { name: '', age: 0 };
}
export const MyMessage = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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
  fromJSON(object) {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      age: isSet(object.age) ? globalThis.Number(object.age) : 0,
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },
  create(base) {
    return MyMessage.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseMyMessage();
    message.name = object.name ?? '';
    message.age = object.age ?? 0;
    return message;
  },
};
export const MyServiceServiceName = 'example.MyService';
export class MyServiceClientImpl {
  rpc;
  service;
  constructor(rpc, opts) {
    this.service = opts?.service || MyServiceServiceName;
    this.rpc = rpc;
    this.DoSomething = this.DoSomething.bind(this);
  }
  DoSomething(request) {
    const data = MyMessage.encode(request).finish();
    const promise = this.rpc.request(this.service, 'DoSomething', data);
    return promise.then((data) => MyMessage.decode(_m0.Reader.create(data)));
  }
}
function isSet(value) {
  return value !== null && value !== undefined;
}
