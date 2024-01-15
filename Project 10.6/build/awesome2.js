"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protobufjs = require("protobufjs");
const assert = require("node:assert");
const awesome_proto_js_1 = require("./awesome.proto.js");
// enum test
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const message = {
            awesome_field: 'Awesome String',
        };
        console.log(message); // { awesome_field: 'Awesome String' }
        const buffer = (0, awesome_proto_js_1.encodeAwesomeMessage)(message);
        const message2 = (0, awesome_proto_js_1.decodeAwesomeMessage)(buffer);
        console.log(message2); // { awesome_field: 'Awesome String' }
        assert.deepEqual(message2, message);
        const root = new protobufjs.Root();
        yield root.load('proto/awesome.proto', { keepCase: true });
        const awesomeMessage = root.lookupType('awesomepackage.AwesomeMessage');
        const message3 = awesomeMessage.decode(buffer);
        console.log(message3); // AwesomeMessage { awesome_field: 'Awesome String' }
        const message4 = awesomeMessage.toObject(message3);
        console.log(message4); // { awesome_field: 'Awesome String' }
        assert.deepEqual(message4, message);
        const buffer2 = awesomeMessage.encode(message).finish();
        const message5 = (0, awesome_proto_js_1.decodeAwesomeMessage)(buffer2);
        console.log(message5); // { awesome_field: 'Awesome String' }
        assert.deepEqual(message5, message);
    });
}
main();
