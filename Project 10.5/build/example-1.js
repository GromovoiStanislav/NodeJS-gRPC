"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awesome_js_1 = require("./awesome.js");
const buffer = (0, awesome_js_1.encodeAwesomeMessage)({ awesome_field: 'AwesomeString' });
console.log(buffer);
console.log();
const message = (0, awesome_js_1.decodeAwesomeMessage)(buffer);
console.log(message);
// Output:
// Uint8Array(15)[
//   (10, 13, 65, 119, 101, 115, 111, 109, 101, 83, 116, 114, 105, 110, 103)
// ];
//
// {
//   awesome_field: 'AwesomeString';
// }
