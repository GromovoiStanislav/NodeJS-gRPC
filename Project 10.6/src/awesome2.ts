import * as protobufjs from 'protobufjs';
import { parseSchema } from 'pbjs';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import {
  AwesomeMessage,
  encodeAwesomeMessage,
  decodeAwesomeMessage,
} from './awesome.proto.js';

// enum test
async function main() {
  const message: AwesomeMessage = {
    awesome_field: 'Awesome String',
  };
  console.log(message); // { awesome_field: 'Awesome String' }

  const buffer = encodeAwesomeMessage(message);
  const message2 = decodeAwesomeMessage(buffer);
  console.log(message2); // { awesome_field: 'Awesome String' }
  assert.deepEqual(message2, message);

  const root = new protobufjs.Root();
  await root.load('proto/awesome.proto', { keepCase: true });

  const awesomeMessage = root.lookupType('awesomepackage.AwesomeMessage');
  const message3 = awesomeMessage.decode(buffer);
  console.log(message3); // AwesomeMessage { awesome_field: 'Awesome String' }
  const message4 = awesomeMessage.toObject(message3);
  console.log(message4); // { awesome_field: 'Awesome String' }
  assert.deepEqual(message4, message);

  {
    const buffer2 = awesomeMessage.encode(message).finish();
    const message5 = decodeAwesomeMessage(buffer2);
    console.log(message5); // { awesome_field: 'Awesome String' }
    assert.deepEqual(message5, message);
  }

  {
    const buffer2 = awesomeMessage
      .encode(awesomeMessage.create(message))
      .finish();
    const message5 = decodeAwesomeMessage(buffer2);
    console.log(message5); // { awesome_field: 'Awesome String' }
    assert.deepEqual(message5, message);
  }
}

main();
