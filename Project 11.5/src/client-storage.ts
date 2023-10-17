import * as grpc from '@grpc/grpc-js';
import { StorageClient, Query, Object } from './types/storage.js';

const client = new StorageClient(
  '0.0.0.0:4884',
  grpc.credentials.createInsecure()
);

client.get(
  new Query({ id: 'ttttt' }),
  (err: grpc.ServiceError | null, object: Object) => {
    if (err) console.log(err);
    else console.log(object.name);
  }
);

const callback: grpc.requestCallback<Object> = (err, object) => {
  if (err) console.log(err);
  else console.log(object.name);
};
client['get'](new Query({ id: 'fffff' }), callback);
client.get(new Query({ id: 'ggggg' }), callback);
