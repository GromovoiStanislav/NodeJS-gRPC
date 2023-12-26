const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('node:path');

// Load the protobuf file dynamically
const protoPath = path.join(__dirname, '/../protos/currency.proto');
const packageDefinition = protoLoader.loadSync(protoPath);
const currencyProto = grpc.loadPackageDefinition(packageDefinition).currency;

// Create gRPC client
const client = new currencyProto.CurrencyConverter(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Function to convert currency
function convertCurrency(fromCurrency, toCurrency, amount) {
  const request = {
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
    amount: amount,
  };

  client.convert(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log(
        `Converted ${amount} ${fromCurrency} to ${response.convertedAmount} ${toCurrency}`
      );
    }
  });
}

// Test the client
convertCurrency('USD', 'EUR', 100);
