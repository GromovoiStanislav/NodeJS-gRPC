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
const pbjs_1 = require("pbjs");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
function parseTestProto() {
    return (0, pbjs_1.parseSchema)(fs.readFileSync(path.resolve(__dirname, '..', './proto/enum.proto'), 'utf8')).compile();
}
// enum test
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = parseTestProto();
        const message = {
            a: "B" /* Enum.B */,
            b: "A" /* Enum.A */,
            c: ["A" /* Enum.A */, "B" /* Enum.B */],
        };
        console.log(message); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        const buffer = schema.encodeEnumTest(message);
        const message2 = schema.decodeEnumTest(buffer);
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
        const message5 = enumTest.fromObject(message);
        console.log(message5); // { c: [ 'A', 'B' ], a: 'B', b: 'A' }
        const buffer2 = enumTest.encode(message5).finish();
        const message6 = enumTest.decode(buffer2);
        console.log(message6); // EnumTest { c: [ 0, 1 ], a: 1, b: 0 }
        const message7 = enumTest.toObject(message6, { enums: String });
        console.log(message7); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        assert.deepEqual(message7, message);
        const message8 = schema.decodeEnumTest(buffer2);
        console.log(message8); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
        assert.deepEqual(message8, message);
    });
}
main();
