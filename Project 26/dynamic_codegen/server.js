const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('node:path');

// Load the protobuf file dynamically
const protoPath = path.join(__dirname, '/../protos/currency.proto');
const packageDefinition = protoLoader.loadSync(protoPath);
const currencyProto = grpc.loadPackageDefinition(packageDefinition).currency;

const convert = (call, callback) => {
  // In a real application, you'd fetch exchange rates from an external source.
  // For this example, we'll use simple conversion rates.
  rates = {
    USD: 1.0,
    EUR: 0.85,
    JPY: 110.0,
  };

  const fromCurrency = call.request.fromCurrency;
  const toCurrency = call.request.toCurrency;
  const amount = call.request.amount;

  const fromRate = rates[fromCurrency];
  if (!fromRate) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: 'unknown from currency',
    });
  }

  const toRate = rates[toCurrency];
  if (!toRate) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: 'unknown to currency',
    });
  }

  const convertedAmount = amount * (fromRate / toRate);

  callback(null, { convertedAmount });
};

const serverUrl = 'localhost:50051';
const server = new grpc.Server();

server.addService(currencyProto.CurrencyConverter.service, { convert });

server.bindAsync(serverUrl, grpc.ServerCredentials.createInsecure(), (port) => {
  console.log('Server running on', serverUrl);
  server.start();
});
