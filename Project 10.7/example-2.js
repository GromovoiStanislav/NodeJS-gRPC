const protobuf = require('protobufjs');
const {
  Timestamp,
} = require('google-protobuf/google/protobuf/timestamp_pb.js');

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

const testProtobuf = async () => {
  // Заполнение поля timestamp с использованием текущей даты и времени
  const currentTimestamp = new Date();
  const seconds = Math.floor(currentTimestamp.getTime() / 1000);
  const nanos = currentTimestamp.getMilliseconds() * 1000000;

  //timestamp:
  // Создание объекта google.protobuf.Timestamp
  const timestamp = new Timestamp();
  timestamp.fromDate(new Date());

  const payload = {
    createdAt: timestamp.toObject(),
    message: 'A rose by any other name would smell as sweet',
  };
  console.log('Test message:', payload);

  const buffer = await encodeTestMessage(payload);
  console.log(
    `Encoded message (${buffer.length} bytes): `,
    buffer.toString('hex')
  );

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
