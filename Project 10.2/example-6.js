const protobuf = require('protobufjs');
const jsonDescriptor = require('./employees.json');

const encode = () => {
  // Загрузите описание протобуфера из файла mydata.proto
  //const root = protobuf.loadSync('employees.json');
  // or:
  const root = protobuf.Root.fromJSON(jsonDescriptor);

  // Получите тип сообщения для вашей структуры данных
  const Employee = root.lookupType('main.Employee');
  const Employees = root.lookupType('main.Employees');

  // Создайте объект данных
  const payload = { employees: [] };

  const hussein = {
    id: 1001,
    name: 'Hussein',
    salary: 3000,
  };
  {
    // Verify the payload if necessary
    const errMsg = Employee.verify(hussein);
    if (errMsg) throw Error(errMsg);
  }
  payload.employees.push(hussein);

  const ahmed = {
    id: 1002,
    name: 'Ahmed',
    salary: 9000,
  };
  {
    // Verify the payload if necessary
    const errMsg = Employee.verify(ahmed);
    if (errMsg) throw Error(errMsg);
  }
  payload.employees.push(ahmed);

  const rick = {
    id: 1003,
    name: 'Rick',
    salary: 5000,
  };
  {
    // Verify the payload if necessary
    const errMsg = Employee.verify(rick);
    if (errMsg) throw Error(errMsg);
  }
  payload.employees.push(rick);

  // Verify the payload if necessary
  const errMsg = Employees.verify(payload);
  if (errMsg) throw Error(errMsg);

  // Create a new message
  const message = Employees.fromObject(payload); // .create
  console.log(message);

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  const buffer = Employees.encode(message).finish();

  return buffer;
};

const decode = (buffer) => {
  // Загрузите описание протобуфера из файла mydata.proto
  //const root = protobuf.loadSync('employees.json');
  // or:
  const root = protobuf.Root.fromJSON(jsonDescriptor);

  // Получите тип сообщения для вашей структуры данных
  const Employee = root.lookupType('main.Employee');
  const Employees = root.lookupType('main.Employees');

  // Decode Buffer to a message
  const message = Employees.decode(buffer);
  console.log(message);

  console.log();

  // Maybe convert the message back to a plain object
  const object = Employees.toObject(message, {
    // see ConversionOptions
  });
  console.log(object);
  console.log();

  message.employees.forEach((element) => {
    console.log(element);
    console.log('Id:', element.id);
    console.log('Name:', element.name);
    console.log('Salary:', element.salary);
    console.log(Employee.toObject(element));
    console.log();
  });
};

const buffer = encode();
// Output:
// Employees {
//   employees: [
//     Employee { id: 1001, name: 'Hussein', salary: 3000 },
//     Employee { id: 1002, name: 'Ahmed', salary: 9000 },
//     Employee { id: 1003, name: 'Rick', salary: 5000 }
//   ]
// }

decode(buffer);
// Output:
// Employees {
//   employees: [
//     Employee { id: 1001, name: 'Hussein', salary: 3000 },
//     Employee { id: 1002, name: 'Ahmed', salary: 9000 },
//     Employee { id: 1003, name: 'Rick', salary: 5000 }
//   ]
// }

// {
//   employees: [
//     { id: 1001, name: 'Hussein', salary: 3000 },
//     { id: 1002, name: 'Ahmed', salary: 9000 },
//     { id: 1003, name: 'Rick', salary: 5000 }
//   ]
// }

// Employee { id: 1001, name: 'Hussein', salary: 3000 }
// Id: 1001
// Name: Hussein
// Salary: 3000
// { id: 1001, name: 'Hussein', salary: 3000 }

// Employee { id: 1002, name: 'Ahmed', salary: 9000 }
// Id: 1002
// Name: Ahmed
// Salary: 9000
// { id: 1002, name: 'Ahmed', salary: 9000 }

// Employee { id: 1003, name: 'Rick', salary: 5000 }
// Id: 1003
// Name: Rick
// Salary: 5000
// { id: 1003, name: 'Rick', salary: 5000 }
