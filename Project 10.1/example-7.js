const protobuf = require('protobufjs');

// Загрузите описание протобуфера из файла mydata.proto
const root = protobuf.loadSync('proto/test.proto');

const msg = root.lookupType('Test');
//const msg = root.lookupType('test.Test');
const E = root.lookupTypeOrEnum('E');

// НЕ правильно
console.log(msg.decode(msg.encode({ field: 'B' }).finish())); // Test { field: 0 }  - I would've expected 1
console.log(msg.verify({ field: 'B' })); // field: enum value expected

// Правильно
console.log(msg.decode(msg.encode(msg.fromObject({ field: 'B' })).finish())); // Test { field: 1 }

const message = msg.fromObject({ field: 'B' });
if (message.field != null && message.hasOwnProperty('field')) {
  switch (message.field) {
    case 0:
      console.log('A');
      break;
    case 1:
      console.log('B'); // B
      break;
    case 2:
      console.log('C');
      break;
    default:
      return 'field: enum value expected';
  }
}

console.log(E.values['B']); // 1
console.log(E.values.B); // 1

// Правильно
console.log(msg.decode(msg.encode(msg.create({ field: E.values.B })).finish())); // Test { field: 1 }
console.log(
  msg.toObject(
    msg.decode(msg.encode(msg.create({ field: E.values.B })).finish()),
    {
      enums: String,
    }
  )
); // { field: 'B' }

// Правильно
console.log(
  msg.decode(msg.encode(msg.fromObject({ field: E.values.B })).finish())
); // Test { field: 1 }
console.log(
  msg.toObject(
    msg.decode(msg.encode(msg.fromObject({ field: E.values.B })).finish()),
    {
      enums: String,
    }
  )
); // { field: 'B' }

// Правильно
console.log(msg.decode(msg.encode(msg.create({ field: 1 })).finish())); // Test { field: 1 }
console.log(
  msg.toObject(msg.decode(msg.encode(msg.create({ field: 1 })).finish()), {
    enums: String,
  })
); // { field: 'B' }

// Правильно
console.log(msg.decode(msg.encode(msg.fromObject({ field: 1 })).finish())); // Test { field: 1 }
console.log(
  msg.toObject(msg.decode(msg.encode(msg.fromObject({ field: 1 })).finish()), {
    enums: String,
  })
); // { field: 'B' }

// НЕ правильно
console.log(msg.decode(msg.encode(msg.create({ field: 'B' })).finish())); // Test { field: 0 }
console.log(
  msg.toObject(msg.decode(msg.encode(msg.create({ field: 'B' })).finish()), {
    enums: String,
  })
); // { field: 'A' }

// Правильно
console.log(msg.decode(msg.encode(msg.fromObject({ field: 'B' })).finish())); // Test { field: 1}
console.log(
  msg.toObject(
    msg.decode(msg.encode(msg.fromObject({ field: 'B' })).finish()),
    {
      enums: String,
    }
  )
); // { field: 'B' }
