const protobuf = require('protobufjs');

const encodeTestMessage = async (payload) => {
  const root = await protobuf.load('proto/test1.proto');
  const testMessage = root.lookupType('testpackage.testMessage');
  const message = testMessage.create(payload);
  return testMessage.encode(message).finish();
};

const decodeTestMessage = async (buffer) => {
  const root = await protobuf.load('proto/test1.proto');
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

  //timestamp:
  {
    const seconds = timestamp.seconds; // Преобразование Long в обычное число
    const nanos = timestamp.nanos;

    const date = new Date(seconds * 1000 + nanos / 1000000); // Преобразование в миллисекунды

    console.log('timestamp', date);
  }

  const payload = {
    //timestamp: Math.round(new Date().getTime() / 1000), // таймстемп в секундах
    //timestamp: new Date().getTime(), // таймстемп в миллисекундах не декодируется ????
    timestamp,
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
    const timestamp = decodedMessage.timestamp;

    const seconds = timestamp.seconds.toNumber(); // Преобразование Long в обычное число
    const nanos = timestamp.nanos;

    const date = new Date(seconds * 1000 + nanos / 1000000); // Преобразование в миллисекунды

    console.log('timestamp', date);
  }

  {
    const timestamp = decodedMessage.timestamp;
    const date = new Date(timestamp.seconds.toNumber() * 1000);
    date.setMilliseconds(timestamp.nanos / 1e6);
    console.log('timestamp', date);
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
