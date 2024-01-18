const { EnumTest, Enum } = require('./enum.js').test;

const payload = {
  a: Enum.B,
  b: Enum.A,
  c: [Enum.A, Enum.B],
};
console.log(payload);

// Verify the payload if necessary (i.e. when possibly incomplete or invalid)
const errMsg = EnumTest.verify(payload);
if (errMsg) {
  throw Error(errMsg);
}

// Create a new message
//const message = EnumTest.create(payload); // or use .fromObject
const message = EnumTest.fromObject(payload); // or use .create
console.log(message);

// Encode a message to an Uint8Array (browser) or Buffer (node)
const buffer = EnumTest.encode(message).finish();
console.log(buffer);
// ... do something with buffer

{
  // Decode an Uint8Array (browser) or Buffer (node) to a message
  const message = EnumTest.decode(buffer);
  console.log(message);
  // ... do something with message

  // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

  // Maybe convert the message back to a plain object
  const object = EnumTest.toObject(message, {
    // see ConversionOptions
  });
  console.log(object);
}

// Output:
// { a: 1, b: 0, c: [ 0, 1 ] }
// EnumTest { c: [ 0, 1 ], a: 1, b: 0 }
// <Buffer 08 01 10 00 1a 02 00 01>
// EnumTest { c: [ 0, 1 ], a: 1, b: 0 }
// { a: 1, b: 0, c: [ 0, 1 ] }
