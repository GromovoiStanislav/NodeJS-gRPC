import { example } from './example.js'; // Импортируйте сгенерированный протокол
// Создание объекта MyMessage
const request = new example.MyMessage({ name: 'John', age: 30 });
console.log(request);
const plainObj = request.toObject();
console.log(plainObj);
plainObj.name = 'New name';
plainObj.age = 20;
const newObj = example.MyMessage.fromObject(plainObj);
console.log(newObj);
// Сериализация объекта в бинарные данные
const serializedData = request.serializeBinary(); //: Uint8Array
console.log(serializedData);
// Бинарные данные, полученные с сервера или другим способом
const binaryData = serializedData; // Замените на реальные данные
// Десериализация бинарных данных в объект MyMessage
const deserializedRequest = example.MyMessage.deserializeBinary(binaryData);
console.log(deserializedRequest);
// Доступ к данным в объекте
const name = deserializedRequest.name;
const age = deserializedRequest.age;
console.log(name, age);
