import * as protobufjs from 'protobufjs';
import * as assert from 'node:assert';
import {
  Enum,
  EnumTest,
  decodeEnumTest,
  encodeEnumTest,
} from './enum.proto.js';

// enum test
async function main() {
  const message: EnumTest = {
    a: Enum.B,
    b: Enum.A,
    c: [Enum.A, Enum.B],
  };
  console.log(message); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }

  const buffer = encodeEnumTest(message);
  const message2 = decodeEnumTest(buffer);
  console.log(message2); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
  assert.deepEqual(message2, message);

  const root = new protobufjs.Root();
  await root.load('proto/enum.proto', { keepCase: true });

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

  const message6 = decodeEnumTest(buffer2);
  console.log(message6); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }
  assert.deepEqual(message2, message);
}

main();
