var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const parseArgs = require('minimist');

var PROTO_PATH = __dirname + '/helloworld.proto';

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target',
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new hello_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'world';
  }
  client.sayHello({ name: user }, function (err, response) {
    console.log('Greeting:', response.message);
  });

  client.sayHelloAgain({ name: user }, function (err, response) {
    console.log('Greeting:', response.message);
  });

  const stream1 = client.sayHelloStreamReply({
    names: [{ name: 'Stas' }, { name: 'Tom' }, { name: 'Sam' }],
  });
  stream1.on('data', (chunk) => {
    console.log(chunk);
  });
  stream1.on('end', () => {
    console.log('communication ended');
  });
}

main();
