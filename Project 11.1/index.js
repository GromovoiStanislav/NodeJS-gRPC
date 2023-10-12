const { MyMessage } = require('./protos/example_pb');

const myMessage = new MyMessage();

// Установите значения полей объекта MyMessage
myMessage.setName('John');
myMessage.setAge(30);

// Получите значения полей объекта MyMessage
const name = myMessage.getName();
const age = myMessage.getAge();

console.log('Name: ' + name);
console.log('Age: ' + age);

// Сериализуйте объект MyMessage в бинарный формат
const binaryData = myMessage.serializeBinary();
console.log(binaryData);

// Десериализуйте бинарные данные обратно в объект MyMessage
const deserializedMessage =
  proto.example.MyMessage.deserializeBinary(binaryData);
console.log(deserializedMessage);

/////////

console.log(myMessage.toObject()); // { name: 'John', age: 30 }
console.log(myMessage.toString()); // John,30

console.log('cloning:');
console.log(myMessage.cloneMessage());
console.log(myMessage.clone());
