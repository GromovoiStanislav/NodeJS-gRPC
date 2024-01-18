require('./protos/example_pb');

const { Message, User, Type } = proto.example;

const user1 = new User();
user1.setName('Tom');

const user2 = new User();
user2.setName('Tomas');

const message = new Message();
message.setTo(user1);
message.setFrom(user2);
//message.setType(2);
message.setType(Type.C);

console.log(message.getFrom().getName()); // Tomas
console.log(user1.getName()); // Tom
console.log(user2.getName()); // Toma
console.log(message.getType()); // 2

console.log(message.toObject()); // { to: { name: 'Tom' }, from: { name: 'Tomas' }, type: 2 }
console.log(message.toString()); // Tom,Tomas,2

// Сериализуйте объект MyMessage в бинарный формат
const binaryData = message.serializeBinary();
console.log(binaryData);

////////////////

// Десериализуйте бинарные данные обратно в объект MyMessage
const deserializedMessage = Message.deserializeBinary(binaryData);
console.log(deserializedMessage);

console.log(deserializedMessage.toObject()); // { to: { name: 'Tom' }, from: { name: 'Tomas' }, type: 2 }
console.log(deserializedMessage.toString()); // Tom,Tomas,2

console.log(deserializedMessage.getType() == 2); // true
console.log(deserializedMessage.getType() == Type.C); // true

////////////////
// console.log('cloning:');
// console.log(message.cloneMessage().getTo().getName()); // Tom
// console.log(message.clone().getFrom().getName()); // Tomas
