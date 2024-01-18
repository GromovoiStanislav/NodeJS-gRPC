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
const enum_proto_js_1 = require("./enum.proto.js");
// enum test
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const message = {
            a: "B" /* Enum.B */,
            b: "A" /* Enum.A */,
            c: ["A" /* Enum.A */, "B" /* Enum.B */],
        };
        console.log(message); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        const buffer = (0, enum_proto_js_1.encodeEnumTest)(message);
        const message2 = (0, enum_proto_js_1.decodeEnumTest)(buffer);
        console.log(message2); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        assert.deepEqual(message2, message);
        const root = new protobufjs.Root();
        yield root.load('proto/enum.proto', { keepCase: true });
        const enumTest = root.lookupType('test.EnumTest');
        const message3 = enumTest.decode(buffer);
        console.log(message3); // EnumTest { c: [ 0, 1 ], a: 1, b: 0 }
        const message4 = enumTest.toObject(message3, { enums: String });
        console.log(message4); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        assert.deepEqual(message4, message);
        const buffer2 = enumTest.encode(enumTest.fromObject(message)).finish();
        const message5 = enumTest.toObject(enumTest.decode(buffer2), {
            enums: String,
        });
        console.log(message5); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        assert.deepEqual(message5, message);
        const message6 = (0, enum_proto_js_1.decodeEnumTest)(buffer2);
        console.log(message6); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        assert.deepEqual(message2, message);
    });
}
main();
