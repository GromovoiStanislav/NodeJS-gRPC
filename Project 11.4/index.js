const { CreateUserRequest } = require('./generated/protos/users_pb');

const userRequest = new CreateUserRequest();
userRequest.setName('John Doe');
userRequest.setEmail('john_doe@mail.com');

console.log(userRequest);
console.log(userRequest.toObject());
console.log(userRequest.toArray());
console.log(userRequest.toString());

console.log(userRequest.clone());
console.log(userRequest.cloneMessage());

const binaryData = userRequest.serializeBinary();
console.log(binaryData);
console.log(binaryData);

const deserializData = CreateUserRequest.deserializeBinary(binaryData);
console.log(deserializData);
console.log(deserializData.getName());
console.log(deserializData.getEmail());
