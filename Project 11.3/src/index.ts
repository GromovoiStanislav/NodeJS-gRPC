import { MyMessage } from './example.js';

// Создайте экземпляр MyMessage
const message = MyMessage.create({
  name: 'Alice',
  age: 25,
});
console.log(message);

// Сериализация сообщения
const serializedMessage = MyMessage.encode(message).finish();
console.log('Serialized Message:', serializedMessage);

// Десериализация сообщения
const deserializedMessage = MyMessage.decode(serializedMessage);
console.log('Deserialized Message:', deserializedMessage);
