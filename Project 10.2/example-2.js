const protobuf = require('protobufjs');

// Загрузите описание протобуфера из файла mydata.proto
protobuf.load('awesome.json', (err, root) => {
  if (err) {
    throw err;
  }

  // Получите тип сообщения для вашей структуры данных
  const AwesomeMessage = root.lookupType('awesomepackage.AwesomeMessage');

  const payload = { awesomeField: 'AwesomeString' };

  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  const errMsg = AwesomeMessage.verify(payload);
  if (errMsg) {
    throw Error(errMsg);
  }

  // Create a new message
  //const message = AwesomeMessage.create(payload); // or use .fromObject
  const message = AwesomeMessage.fromObject(payload); // or use .create
  console.log(message);

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  const buffer = AwesomeMessage.encode(message).finish();
  console.log(buffer);
  // ... do something with buffer

  {
    // Decode an Uint8Array (browser) or Buffer (node) to a message
    const message = AwesomeMessage.decode(buffer);
    console.log(message);
    // ... do something with message

    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    const object = AwesomeMessage.toObject(message, {
      // see ConversionOptions
    });
    console.log(object);
  }
});

// Output:
// AwesomeMessage { awesomeField: 'AwesomeString' }
// <Buffer 0a 0d 41 77 65 73 6f 6d 65 53 74 72 69 6e 67>
// AwesomeMessage { awesomeField: 'AwesomeString' }
// { awesomeField: 'AwesomeString' }
