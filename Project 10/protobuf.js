const protobuf = require('protobufjs');

// Загрузите описание протобуфера из файла mydata.proto
const root = protobuf.loadSync('mydata.proto');

// Получите тип сообщения для вашей структуры данных
const MyData = root.lookupType('MyData');

// Создайте объект данных
const data = {
  name: 'John',
  age: 30,
};

// Сериализуйте данные в бинарный протобуфер
const buffer = MyData.encode(MyData.create(data)).finish();

// Выведите бинарный протобуфер (это можно отправить или сохранить)
console.log(buffer); // <Buffer 0a 04 4a 6f 68 6e 10 1e>

// Десериализуйте бинарный протобуфер обратно в объект
const decodedData = MyData.decode(buffer);

// Выведите десериализованный объект
console.log(decodedData); // MyData { name: 'John', age: 30 }

const uint8Array = new Uint8Array(buffer);
console.log(uint8Array); // Uint8Array(8) [10, 4, 74, 111, 104, 110, 16, 30]
