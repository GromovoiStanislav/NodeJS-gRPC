import * as protobufjs from 'protobufjs';
import { parseSchema } from 'pbjs';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import { Enum, EnumTest } from './enum.proto.js';
import * as path from 'node:path';

function parseTestProto() {
  return parseSchema(
    fs.readFileSync(path.resolve(__dirname, '..', './proto/enum.proto'), 'utf8')
  ).compile();
}

// enum test
async function main() {
  const schema = parseTestProto();

  const message: EnumTest = {
    a: Enum.B,
    b: Enum.A,
    c: [Enum.A, Enum.B],
  };
  console.log(message); // { a: 'B', b: 'A', c: [ 'A', 'B' ] }

  const buffer = schema.encodeEnumTest(message);
  const message2 = schema.decodeEnumTest(buffer);
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
}

main();
