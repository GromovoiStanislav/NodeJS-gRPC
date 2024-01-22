const protobuf = require('protobufjs');
const {
  Timestamp,
} = require('google-protobuf/google/protobuf/timestamp_pb.js');
const fs = require('node:fs/promises');

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

const readFile = async (fileName) => {
  try {
    return await fs.readFile(fileName);
  } catch (err) {
    console.error('Error occurred while reading file:', err);
  }
};

const testProtobuf = async () => {
  const buffer = await readFile('from-golang.bin');

  const decodedMessage = await decodeTestMessage(buffer);
  console.log('Decoded test message:', decodedMessage);

  //timestamp:
  {
    const timestamp = decodedMessage.createdAt;
    console.log('timestamp', timestamp);

    const seconds = timestamp.seconds.toNumber(); // Преобразование Long в обычное число
    const nanos = timestamp.nanos;

    const date = new Date(seconds * 1000 + nanos / 1000000); // Преобразование в миллисекунды

    console.log('timestamp', date); // timestamp 2024-01-22T05:05:46.179Z
  }

  //timestamp:
  {
    const timestamp = decodedMessage.createdAt;
    const date = new Date(timestamp.seconds.toNumber() * 1000);
    date.setMilliseconds(timestamp.nanos / 1e6);
    console.log('timestamp', date); // timestamp 2024-01-22T05:05:46.179Z
  }

  //timestamp:
  {
    //const timestamp = decodedMessage.createdAt;

    const timestamp = new Timestamp();
    timestamp.setSeconds(decodedMessage.createdAt.seconds);
    timestamp.setNanos(decodedMessage.createdAt.nanos);
    console.log('timestamp', timestamp.toDate()); // timestamp 2024-01-22T05:05:46.179Z
  }
};

testProtobuf();

//
// Decoded test message: {
//   createdAt: {
//     seconds: Long { low: 1705921227, high: 0, unsigned: false },
//     nanos: 109528700
//   },
//   message: 'Helo from Glang!!!'
// }
// timestamp {
//   seconds: Long { low: 1705921227, high: 0, unsigned: false },
//   nanos: 109528700
// }
// timestamp 2024-01-22T11:00:27.109Z
// timestamp 2024-01-22T11:00:27.109Z
// timestamp 2024-01-22T11:00:27.109Z
