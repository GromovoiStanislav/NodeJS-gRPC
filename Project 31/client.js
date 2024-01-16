const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const bcrypt = require('bcrypt');

const PROTO_PATH = './password.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const grpcObj = protoLoader.loadSync(PROTO_PATH, options);
const PasswordService =
  grpc.loadPackageDefinition(grpcObj).password.PasswordService;

const clientStub = new PasswordService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const retrievePasswords = () => {
  clientStub.retrievePasswords({}, (error, passwords) => {
    //implement your error logic here
    console.log(passwords);
  });
};

const addNewDetails = () => {
  const saltRounds = 10;
  const passwordToken = '5TgU76W&eRee!';

  bcrypt.genSalt(saltRounds, (error, salt) => {
    //implement your error logic here
    bcrypt.hash(passwordToken, salt, (error, hash) => {
      //implement your error logic here

      clientStub.addNewDetails(
        {
          id: Date.now(),
          password: passwordToken,
          hashValue: hash,
          saltValue: salt,
        },
        (error, passwordDetails) => {
          //implement your error logic here
          console.log(passwordDetails);
        }
      );
    });
  });
};

const updatePasswordDetails = () => {
  const saltRounds = 10;
  const updatePasswordToken = 'H7hG%$Yh33';

  bcrypt.genSalt(saltRounds, (error, salt) => {
    //implement your error logic here
    bcrypt.hash(updatePasswordToken, salt, (error, hash) => {
      //implement your error logic here

      clientStub.updatePasswordDetails(
        {
          id: 153642,
          password: updatePasswordToken,
          hashValue: hash,
          saltValue: salt,
        },
        (error, passwordDetails) => {
          //implement your error logic here
          console.log(passwordDetails);
        }
      );
    });
  });
};

retrievePasswords();
addNewDetails();
updatePasswordDetails();
retrievePasswords();
