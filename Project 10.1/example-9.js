const protobuf = require('protobufjs');

const encodeTestMessage = async (payload) => {
  const root = await protobuf.load('proto/test3.proto');
  const testMessage = root.lookupType('testpackage.testMessage');
  const message = testMessage.create(payload);
  return testMessage.encode(message).finish();
};

const decodeTestMessage = async (buffer) => {
  const root = await protobuf.load('proto/test3.proto');
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

  // Создание объекта google.protobuf.Timestamp
  const timestamp = {
    seconds,
    nanos,
  };

  const payload = {
    //timestamp: Math.round(new Date().getTime() / 1000), // таймстемп в секундах uint32
    timestamp: new Date().getTime(), // таймстемп в миллисекундах не декодируется uint64
    //timestamp,
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

  {
    const timestamp = decodedMessage.timestamp;
    console.log('timestamp', timestamp.toNumber());
  }
};

testProtobuf();

// Output:

// Test message: {
//   timestamp: 1705900209520,
//   message: 'A rose by any other name would smell as sweet'
// }

// Encoded message (54 bytes):  08f0eacdfcd231122d4120726f736520627920616e79206f74686572206e616d6520776f756c6420736d656c6c206173207377656574

// Decoded test message: {
//   timestamp: Long { low: 798193008, high: 397, unsigned: true },
//   message: 'A rose by any other name would smell as sweet'
// }

// timestamp 1705900209520
