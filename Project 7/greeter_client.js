const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const parseArgs = require('minimist');

const PROTO_PATH = __dirname + '/helloworld.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'target',
  });
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  const client = new hello_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  let user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'world';
  }

  ////////////////////////////////
  client.sayHello({ name: user }, function (err, response) {
    console.log('Greeting:', response.message);
  });

  //////////////////////////////////
  client.sayHelloAgain({ name: user }, function (err, response) {
    console.log('Greeting:', response.message);
  });

  ///////////////////////////////////
  client.sayHelloMany(
    {
      names: [{ name: 'Stas' }, { name: 'Tom' }, { name: 'Sam' }],
    },
    function (err, response) {
      console.log('Greetings:', response.messages);
    }
  );

  ///////////////////////////////////
  const stream1 = client.sayHelloStreamReply({
    names: [{ name: 'Stas' }, { name: 'Tom' }, { name: 'Sam' }],
  });
  stream1.on('data', (chunk) => {
    console.log(chunk);
  });
  stream1.on('end', () => {
    console.log('communication ended');
  });

  ////////////////////////////////////
  const stream2 = client.streamSayHelloReply((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Greetings:', result.messages);
  });
  stream2.write({ name: 'Name_1' });
  stream2.write({ name: 'Name_2' });
  stream2.write({ name: 'Name_3' });
  stream2.write({ name: 'Name_4' });
  stream2.end();

  /////////////////////////////////////////////////////
  const stream3 = client.streamSayHelloStreamReply();
  stream3.on('data', (chunk) => {
    console.log(chunk);
  });
  stream3.on('end', () => {
    console.log('communication ended');
  });
  stream3.write({ name: 'Name 1' });
  stream3.write({ name: 'Name 2' });
  stream3.write({ name: 'Name 3' });
  stream3.write({ name: 'Name 4' });
  stream3.end();
}

main();
