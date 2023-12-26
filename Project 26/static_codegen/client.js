const messages = require('./currency_pb');
const services = require('./currency_grpc_pb');
const grpc = require('@grpc/grpc-js');

const client = new services.CurrencyConverterClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Function to convert currency
function convertCurrency(fromCurrency, toCurrency, amount) {
  const request = new messages.ConvertRequest();
  request.setFromCurrency(fromCurrency);
  request.setToCurrency(toCurrency);
  request.setAmount(amount);

  client.convert(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log(
        `Converted ${amount} ${fromCurrency} to ${response.getConvertedAmount()} ${toCurrency}`
      );
    }
  });
}

// Test the client
convertCurrency('USD', 'EUR', 100);
