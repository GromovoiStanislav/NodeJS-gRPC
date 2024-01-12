const pbjs = require('pbjs');
const fs = require('node:fs');
const path = require('node:path');

const encode = () => {
  const filePath = path.join(__dirname, 'proto/employees.proto');
  const schema = pbjs.parseSchema(fs.readFileSync(filePath, 'utf8')).compile();

  // console.log(schema);
  // {
  //   encodeEmployee: [Function (anonymous)],
  //   decodeEmployee: [Function (anonymous)],
  //   encodeEmployees: [Function (anonymous)],
  //   decodeEmployees: [Function (anonymous)]
  // }

  // Создайте объект данных
  const payload = { employees: [] };

  const hussein = {
    id: 1001,
    name: 'Hussein',
    salary: 3000,
  };
  {
    const buffer = schema.encodeEmployee(hussein);
    console.log(buffer);
    const employee = schema.decodeEmployee(buffer);
    console.log(employee);
    console.log();
  }
  payload.employees.push(hussein);

  const ahmed = {
    id: 1002,
    name: 'Ahmed',
    salary: 9000,
  };
  payload.employees.push(ahmed);

  const rick = {
    id: 1003,
    name: 'Rick',
    salary: 5000,
  };
  payload.employees.push(rick);

  // Encode a message to an Uint8Array
  const buffer = schema.encodeEmployees(payload);
  console.log(buffer);
  console.log();

  return buffer;
};

const decode = (buffer) => {
  const filePath = path.join(__dirname, 'proto/employees.proto');
  const schema = pbjs.parseSchema(fs.readFileSync(filePath, 'utf8')).compile();

  // Decode Buffer to a message
  const message = schema.decodeEmployees(buffer);
  console.log(message);

  console.log();

  message.employees.forEach((element) => {
    console.log(element);
    console.log('Id:', element.id);
    console.log('Name:', element.name);
    console.log('Salary:', element.salary);
    console.log();
  });
};

const buffer = encode();
// Output:
// Uint8Array(17) [
//   8, 233,   7,  18,   7,  72,
// 117, 115, 115, 101, 105, 110,
//  29,   0, 128,  59,  69
// ]
// { id: 1001, name: 'Hussein', salary: 3000 }
//
// Uint8Array(52) [
//   10,  17,   8, 233,  7,  18,   7,  72, 117, 115, 115,
//  101, 105, 110,  29,  0, 128,  59,  69,  10,  15,   8,
//  234,   7,  18,   5, 65, 104, 109, 101, 100,  29,   0,
//  160,  12,  70,  10, 14,   8, 235,   7,  18,   4,  82,
//  105,  99, 107,  29,  0,  64, 156,  69
// ]

decode(buffer);
// Output:
// {
//   employees: [
//     { id: 1001, name: 'Hussein', salary: 3000 },
//     { id: 1002, name: 'Ahmed', salary: 9000 },
//     { id: 1003, name: 'Rick', salary: 5000 }
//   ]
// }
//
// { id: 1001, name: 'Hussein', salary: 3000 }
// Id: 1001
// Name: Hussein
// Salary: 3000

// { id: 1002, name: 'Ahmed', salary: 9000 }
// Id: 1002
// Name: Ahmed
// Salary: 9000

// { id: 1003, name: 'Rick', salary: 5000 }
// Id: 1003
// Name: Rick
// Salary: 5000