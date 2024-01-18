const protobuf = require('protobufjs');

// Загрузите описание протобуфера из файла mydata.proto
const root = protobuf.loadSync('proto/test2.proto');

const msg = root.lookupType('OrderItem');
//const msg = root.lookupType('test.Test');
//const E = root.lookupTypeOrEnum('E');

// Правильно
//console.log(msg.decode(msg.encode(msg.fromObject({ field: 'B' })).finish())); // Test { field: 1 }

const orderItem = msg.decode(
  msg.encode(msg.fromObject({ type: 'eService' })).finish()
);
console.log(orderItem); // OrderItem { type: 2 }
console.log(orderItem.toJSON()); // { type: 'eService' } - It is a WRONG behavior and causes unexpected result at runtime!!!!

// solution:
protobuf.util.toJSONOptions = {
  longs: String,
  enums: Number,
  bytes: String,
  json: true,
};
console.log(orderItem.toJSON()); // { type: 2 }
