const schema = require('./awesome.js');

const buffer = schema.encodeAwesomeMessage({ awesome_field: 'AwesomeString' });
console.log(buffer);

console.log();

const message = schema.decodeAwesomeMessage(buffer);
console.log(message);

// Output:
// Uint8Array(15)[
//   (10, 13, 65, 119, 101, 115, 111, 109, 101, 83, 116, 114, 105, 110, 103)
// ];
//
// {
//   awesome_field: 'AwesomeString';
// }
