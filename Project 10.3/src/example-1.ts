import { awesomepackage } from './awesome.js';

const { AwesomeMessage } = awesomepackage;

// example code
const message = AwesomeMessage.create({ awesomeField: 'hello' });
console.log(message);
console.log(`message = ${JSON.stringify(message)}`);

const buffer = AwesomeMessage.encode(message).finish();
console.log(buffer);
console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

const decoded = AwesomeMessage.decode(buffer);
console.log(decoded);
console.log(`decoded = ${JSON.stringify(decoded)}`);

const object = AwesomeMessage.toObject(decoded);
console.log(object);

// Output:
// AwesomeMessage { awesomeField: 'hello' }
// message = {"awesomeField":"hello"}
// <Buffer 0a 05 68 65 6c 6c 6f>
// buffer = 10,5,104,101,108,108,111
// AwesomeMessage { awesomeField: 'hello' }
// decoded = {"awesomeField":"hello"}
// { awesomeField: 'hello' }
