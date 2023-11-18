const Schema = require('./proto/employees_pb');
const fs = require('fs');

// write data
{
  const hussein = new Schema.Employee();
  hussein.setId(1001);
  hussein.setName('Hussein');
  hussein.setSalary(3000);

  const ahmed = new Schema.Employee();
  ahmed.setId(1002);
  ahmed.setName('Ahmed');
  ahmed.setSalary(9000);

  const rick = new Schema.Employee();
  rick.setId(1003);
  rick.setName('Rick');
  rick.setSalary(5000);

  const employees = new Schema.Employees();
  employees.addEmployees(hussein);
  employees.addEmployees(ahmed);
  employees.addEmployees(rick);

  const bytes = employees.serializeBinary();
  console.log('binary ' + bytes);
  console.log();
  fs.writeFileSync('employeesbinary', bytes);
}

// read data
{
  const bytes = fs.readFileSync('employeesbinary');
  const employees = Schema.Employees.deserializeBinary(bytes);
  // console.log(employees.toString());

  console.log(employees.toObject().employeesList);
  console.log();

  const employeesList = employees.getEmployeesList();
  // console.log(employeesList);

  employeesList.forEach((element) => {
    // console.log(element.toString());
    console.log(element.toObject());
    console.log('Id:', element.getId());
    console.log('Name:', element.getName());
    console.log('Salary:', element.getSalary());
    console.log();
  });
}
