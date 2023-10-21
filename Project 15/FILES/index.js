import 'dotenv/config.js';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'stream';

import utils from './utils/index.js';
import fileStorage from './fileStorage/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, './proto/files.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

// Загрузка gRPC пакета определения
const { files_service_package } = grpc.loadPackageDefinition(packageDefinition);

// Инициализация объекта для хранения клиентских потоков по чатам
const chatClients = {};
const AVATARS_BUCKET = 'avatars';

const server = new grpc.Server();
server.addService(files_service_package.FilesRpc.service, {
  /*
    Реализация методов сервера:
  */
  PutFile: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { bucket, name, data } = call.request;

    /// Проверка на пустые поля
    if (!bucket) {
      const error = new Error('Bucket not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    if (!name) {
      const error = new Error('Name not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    if (!data) {
      const error = new Error('File not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const tag = await fileStorage.putFile({
        bucketName: bucket,
        fileName: name,
        file: data,
      });

      /// Ответ
      callback(null, {
        message: 'Success',
        is_complete: true,
        tag: tag.etag,
      });
    } catch (e) {
      console.log(e);
      const error = new Error('PutFilenpm is error');
      error.code = grpc.status.INTERNAL;
      callback(error);
    }
  },

  DeleteFile: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { bucket, name } = call.request;

    /// Проверка на пустые поля
    if (!bucket) {
      const error = new Error('Bucket not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    if (!name) {
      const error = new Error('Name not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      if (!(await fileStorage.bucketExists(bucket))) {
        const error = new Error('Bucket not exists');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }

      await fileStorage.removeFile({
        bucketName: bucket,
        fileName: name,
      });

      /// Ответ
      callback(null, {
        message: 'Success',
        is_complete: true,
      });
    } catch (e) {
      console.log(e);
      const error = new Error('DeleteFile is error');
      error.code = grpc.status.INTERNAL;
      callback(error);
    }
  },

  FetchFile: async (call) => {
    const author_id = utils.getIdFromMetadata(call, undefined, true);
    if (!author_id) {
      return;
    }

    const { bucket, name } = call.request;

    /// Проверка на пустые поля
    if (!bucket) {
      call.emit('error', {
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Bucket not found',
      });
      return;
    }
    if (!name) {
      call.emit('error', {
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Name not found',
      });
      return;
    }

    try {
      if (!(await fileStorage.bucketExists(bucket))) {
        call.emit('error', {
          code: grpc.status.NOT_FOUND,
          details: 'Bucket not exists',
        });
        return;
      }

      const customStream = new Readable();
      customStream._read = () => {};

      customStream.on('data', (chunk) => {
        call.write({ data: chunk });
      });

      customStream.on('end', () => {
        call.end();
      });

      customStream.on('error', (error) => {
        call.emit('error', {
          code: grpc.status.INTERNAL,
          details: error.message,
        });
      });

      fileStorage.fetchFileStream({
        customStream,
        bucketName: bucket,
        fileName: name,
      });
    } catch (e) {
      console.log(e);
      call.emit('error', {
        code: grpc.status.INTERNAL,
        details: 'FetchFile is error',
      });
    }
  },

  PutAvatar: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { data } = call.request;

    /// Проверка на пустые поля
    if (!data) {
      const error = new Error('File not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    /// Проверка на размер
    if (data.length > 1e6) {
      //1_000_000
      const error = new Error('Avatar is very big');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const tag = await fileStorage.putFile({
        bucketName: AVATARS_BUCKET,
        fileName: String(author_id),
        file: data,
      });

      /// Ответ
      callback(null, {
        message: 'Success',
        is_complete: true,
        tag: tag.etag,
      });
    } catch (e) {
      console.log(e);
      const error = new Error('PutAvatar is error');
      error.code = grpc.status.INTERNAL;
      callback(error);
    }
  },

  DeleteAvatar: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    try {
      if (!(await fileStorage.bucketExists(AVATARS_BUCKET))) {
        const error = new Error('Bucket not exists');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }

      await fileStorage.removeFile({
        bucketName: AVATARS_BUCKET,
        fileName: String(author_id),
      });

      /// Ответ
      callback(null, {
        message: 'Success',
        is_complete: true,
      });
    } catch (e) {
      console.log(e);
      const error = new Error('DeleteAvatar is error');
      error.code = grpc.status.INTERNAL;
      callback(error);
    }
  },

  FetchAvatar: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    try {
      if (!(await fileStorage.bucketExists(AVATARS_BUCKET))) {
        call.emit('error', {
          code: grpc.status.NOT_FOUND,
          details: 'Bucket not exists',
        });
        return;
      }

      const data = await fileStorage.fetchFile({
        bucketName: AVATARS_BUCKET,
        fileName: String(author_id),
      });

      /// Ответ
      callback(null, { data });
    } catch (e) {
      console.log(e);
      const error = new Error('FetchAvatar is error');
      error.code = grpc.status.INTERNAL;
      callback(error);
    }
  },
});

// Запуск сервера
const PORT = process.env.PORT ?? '50053';
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
      server.start();
      console.log(`Server running at grpc://0.0.0.0:${PORT}`);
      console.log('[x] To exit press CTRL+C');
    }
  }
);
