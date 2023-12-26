const messages = require('./currency_pb');
const services = require('./currency_grpc_pb');
const grpc = require('@grpc/grpc-js');

/**
 * Implements the Convert RPC method.
 */
const convert = (call, callback) => {
  // In a real application, you'd fetch exchange rates from an external source.
  // For this example, we'll use simple conversion rates.
  rates = {
    USD: 1.0,
    EUR: 0.85,
    JPY: 110.0,
  };

  const fromCurrency = call.request.getFromCurrency();
  const toCurrency = call.request.getToCurrency();
  const amount = call.request.getAmount();

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

  const reply = new messages.ConvertResponse();
  reply.setConvertedAmount(convertedAmount);

  callback(null, reply);
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const serverUrl = 'localhost:50051';
const server = new grpc.Server();
server.addService(services.CurrencyConverterService, { convert });
server.bindAsync(serverUrl, grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running on', serverUrl);
  server.start();
});
