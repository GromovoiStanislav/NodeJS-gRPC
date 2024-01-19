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
  const payload = {
    timestamp: Math.round(new Date().getTime() / 1000), // таймстемп в секундах
    //timestamp: new Date().getTime(), // таймстемп в миллисекундах не декодируется ????
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
};

testProtobuf();

// Output:
// Test message: {
//   timestamp: 1705663203,
//   message: 'A rose by any other name would smell as sweet'
// }
// Encoded message (53 bytes):  08e3b5a9ad06122d4120726f736520627920616e79206f74686572206e616d6520776f756c6420736d656c6c206173207377656574
// Decoded test message: {
//   timestamp: 1705663203,
//   message: 'A rose by any other name would smell as sweet'
// }
