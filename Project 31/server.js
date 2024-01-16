const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './password.proto';

const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// initializing the package definition
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions);

const grpcObj = grpc.loadPackageDefinition(packageDef);

const ourServer = new grpc.Server();

const dummyRecords = {
  passwords: [
    {
      id: '153642',
      password: 'default1',
      hashValue: 'default',
      saltValue: 'default',
    },
    {
      id: '234654',
      password: 'default2',
      hashValue: 'default',
      saltValue: 'default',
    },
  ],
};

ourServer.addService(grpcObj.password.PasswordService.service, {
  retrievePasswords: (call, callback) => {
    callback(null, dummyRecords);
  },

  addNewDetails: (call, callback) => {
    const passwordDetails = { ...call.request };

    dummyRecords.passwords.push(passwordDetails);

    callback(null, passwordDetails);
  },

  updatePasswordDetails: (call, callback) => {
    const detailsID = call.request.id;

    const targetDetails = dummyRecords.passwords.find(
      ({ id }) => detailsID == id
    );

    targetDetails.password = call.request.password;
    targetDetails.hashValue = call.request.hashValue;
    targetDetails.saltValue = call.request.saltValue;

    callback(null, targetDetails);
  },
});

ourServer.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log('Server running at http://127.0.0.1:50051');
    ourServer.start();
  }
);
