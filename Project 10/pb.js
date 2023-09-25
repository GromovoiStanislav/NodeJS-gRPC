const pbjs = require('pbjs');

{
  const schema = pbjs
    .parseSchema(
      `
  message Demo {
    optional int32 x = 1;
    optional float y = 2;
  }
`
    )
    .compile();

  const buffer = schema.encodeDemo({ x: 1, y: 2 });
  console.log(buffer);

  const message = schema.decodeDemo(buffer);
  console.log(message);
}

{
  const schema = pbjs
    .parseSchema(
      `
  message MyData {
    string name = 1;
    int32 age = 2;
  }
`
    )
    .compile();

  const data = {
    name: 'John',
    age: 30,
  };

  const buffer = schema.encodeMyData(data);
  console.log(buffer); // Uint8Array(8) [10, 4, 74, 111, 104, 110, 16, 30]

  const message = schema.decodeMyData(buffer);
  console.log(message); //{ name: 'John', age: 30 }

  // Преобразование Uint8Array в Buffer с помощью Buffer.from()
  const bufferFromUint8Array = Buffer.from(buffer);
  console.log(bufferFromUint8Array); // <Buffer 0a 04 4a 6f 68 6e 10 1e>

  // Преобразование Uint8Array в Buffer с помощью Buffer.alloc()
  const bufferFromUint8Array2 = Buffer.alloc(buffer.length);
  buffer.forEach((value, index) => {
    bufferFromUint8Array2.writeUInt8(value, index);
  });
  console.log(bufferFromUint8Array2);

  console.log(schema.decodeMyData(bufferFromUint8Array2)); // { name: 'John', age: 30 }

  console.log(
    schema.decodeMyData(
      Buffer.from([0x0a, 0x04, 0x4a, 0x6f, 0x68, 0x6e, 0x10, 0x1e])
    )
  ); // { name: 'John', age: 30 }
}
