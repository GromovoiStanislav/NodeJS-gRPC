import { encodeAwesomeMessage, decodeAwesomeMessage } from './awesome.js';
const buffer = encodeAwesomeMessage({ awesome_field: 'AwesomeString' });
console.log(buffer);
console.log();
const message = decodeAwesomeMessage(buffer);
console.log(message);
// Output:
// Uint8Array(15)[
//   (10, 13, 65, 119, 101, 115, 111, 109, 101, 83, 116, 114, 105, 110, 103)
// ];
//
// {
//   awesome_field: 'AwesomeString';
// }
