const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const parseArgs = require('minimist');

const PROTO_PATH = __dirname + '/echo.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const echoProto =
  grpc.loadPackageDefinition(packageDefinition).grpc.examples.echo;

const PROPAGATE_PREFIX = '[propagate me]';

let client;

function unaryEcho(call, callback) {
  const message = call.request.message;
  if (message.startsWith(PROPAGATE_PREFIX)) {
    setTimeout(() => {
      client.unaryEcho(
        { message: message.slice(PROPAGATE_PREFIX.length) },
        { parent: call },
        callback
      );
    }, 800);
    return;
  } else if (message === 'delay') {
    setTimeout(() => {
      callback(null, call.request);
    }, 1500);
  } else {
    callback(null, call.request);
  }
}

function bidirectionalStreamingEcho(call) {
  let lastMessage = null;

  call.on('data', (value) => {
    const message = value.message;
    lastMessage = message;
    call.pause();
    if (message.startsWith(PROPAGATE_PREFIX)) {
      setTimeout(() => {
        client.unaryEcho(
          { message: message.slice(PROPAGATE_PREFIX.length) },
          { parent: call },
          (error, response) => {
            call.resume();
            if (error) {
              call.emit(error);
              return;
            }
            call.write(response);
          }
        );
      }, 800);
      return;
    } else if (message === 'delay') {
      setTimeout(() => {
        call.write(value);
        call.resume();
      }, 1500);
    } else {
      call.write(value);
      call.resume();
    }
  });

  call.on('end', () => {
    if (lastMessage === null) {
      call.emit('error', {
        code: grpc.status.INVALID_ARGUMENT,
        details: 'request message not received',
      });
    }
    call.end();
  });
}

const serviceImplementation = {
  unaryEcho,
  bidirectionalStreamingEcho,
};

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'port',
    default: { port: '50052' },
  });

  const server = new grpc.Server();
  server.addService(echoProto.Echo.service, serviceImplementation);
  server.bindAsync(
    `0.0.0.0:${argv.port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );

  client = new echoProto.Echo(
    `localhost:${argv.port}`,
    grpc.credentials.createInsecure()
  );
}

main();
