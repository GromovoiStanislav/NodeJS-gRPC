const protobuf = require('protobufjs');
const {
  Timestamp,
} = require('google-protobuf/google/protobuf/timestamp_pb.js');
const fs = require('node:fs');

const encodeTestMessage = async (payload) => {
  const root = await protobuf.load('proto/test.proto');
  const testMessage = root.lookupType('testpackage.testMessage');
  const message = testMessage.create(payload);
  return testMessage.encode(message).finish();
};

const decodeTestMessage = async (buffer) => {
  const root = await protobuf.load('proto/test.proto');
  const testMessage = root.lookupType('testpackage.testMessage');
  const err = testMessage.verify(buffer);
  if (err) {
    throw err;
  }
  const message = testMessage.decode(buffer);
  return testMessage.toObject(message);
};

const writeFile = async (fileName, data) => {
  try {
    await fs.writeFile(fileName, data);
  } catch (err) {
    console.error('Error occurred while writing file:', err);
  }
};

const testProtobuf = async () => {
  // Заполнение поля timestamp с использованием текущей даты и времени
  const currentTimestamp = new Date();
  const seconds = Math.floor(currentTimestamp.getTime() / 1000);
  const nanos = currentTimestamp.getMilliseconds() * 1000000;

  // Создание объекта google.protobuf.Timestamp
  const timestamp = {
    seconds,
    nanos,
  };

  //timestamp:
  {
    const seconds = timestamp.seconds; // Преобразование Long в обычное число
    const nanos = timestamp.nanos;

    const date = new Date(seconds * 1000 + nanos / 1000000); // Преобразование в миллисекунды

    console.log('timestamp', date);
  }

  const payload = {
    createdAt: timestamp,
    message: 'A rose by any other name would smell as sweet',
  };
  console.log('Test message:', payload);

  const buffer = await encodeTestMessage(payload);
  console.log(
    `Encoded message (${buffer.length} bytes): `,
    buffer.toString('hex')
  );

  await writeFile('from-nodejs.bin', buffer);

  const decodedMessage = await decodeTestMessage(buffer);
  console.log('Decoded test message:', decodedMessage);

  //timestamp:
  {
    const timestamp = decodedMessage.createdAt;

    const seconds = timestamp.seconds.toNumber(); // Преобразование Long в обычное число
    const nanos = timestamp.nanos;

    const date = new Date(seconds * 1000 + nanos / 1000000); // Преобразование в миллисекунды

    console.log('timestamp', date); // timestamp 2024-01-20T04:39:33.586Z
  }

  //timestamp:
  {
    const timestamp = decodedMessage.createdAt;
    const date = new Date(timestamp.seconds.toNumber() * 1000);
    date.setMilliseconds(timestamp.nanos / 1e6);
    console.log('timestamp', date); // timestamp 2024-01-20T04:39:33.586Z
  }

  //timestamp:
  {
    //const timestamp = decodedMessage.createdAt;

    const timestamp = new Timestamp();
    timestamp.setSeconds(decodedMessage.createdAt.seconds);
    timestamp.setNanos(decodedMessage.createdAt.nanos);
    console.log('timestamp', timestamp.toDate()); // timestamp 2024-01-20T04:39:33.586Z
  }
};

testProtobuf();

// Output:

// timestamp 2024-01-20T04:39:33.586Z
// Test message: {
//   timestamp: { seconds: 1705725573, nanos: 586000000 },
//   message: 'A rose by any other name would smell as sweet'
// }

// Encoded message (61 bytes):  0a0c08859dadad061080cdb69702122d4120726f736520627920616e79206f74686572206e616d6520776f756c6420736d656c6c206173207377656574

// Decoded test message: {
//   timestamp: {
//     seconds: Long { low: 1705725573, high: 0, unsigned: false },
//     nanos: 586000000
//   },
//   message: 'A rose by any other name would smell as sweet'
// }
// timestamp 2024-01-20T04:39:33.586Z
// timestamp 2024-01-20T04:39:33.586Z
// timestamp 2024-01-20T04:39:33.586Z
