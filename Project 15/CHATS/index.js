import 'dotenv/config.js';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import utils from './utils/index.js';
import chatsService from './chats/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, './proto/chats.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

// Загрузка gRPC пакета определения
const { chats_service_package } = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(chats_service_package.ChatsRpc.service, {
  /*
    Реализация методов сервера:
  */
  CreateChat: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { name } = call.request;

    /// Проверка на пустые поля
    if (!name) {
      const error = new Error('Chat name not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    /// Создание нового чата
    try {
      const newChat = await chatsService.createChat({
        name,
        author_id,
      });

      /// Ответ
      callback(null, { message: 'Success' });
    } catch (e) {
      console.log(e);
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },

  FetchAllChats: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    try {
      const listChatsDto = await chatsService.listChats(author_id);

      /// Ответ
      callback(null, { chats: listChatsDto });
    } catch (e) {
      console.log(e);
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },

  DeleteChat: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { id } = call.request;

    /// Проверка на пустые поля
    const chatID = Number(id);
    if (!chatID) {
      const error = new Error('Chat ID not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const chat = await chatsService.getChatByID(chatID);
      if (!chat) {
        const error = new Error('Chat not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }
      if (chat.author_id === author_id) {
        await chatsService.deleteChatByID(chatID);
        callback(null, { message: 'Success' });
      } else {
        const error = new Error('PERMISSION_DENIED');
        error.code = grpc.status.PERMISSION_DENIED;
        callback(error);
      }
    } catch (e) {
      console.log(e);
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },

  FetchChat: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { id } = call.request;

    /// Проверка на пустые поля
    const chatID = Number(id);
    if (!chatID) {
      const error = new Error('Chat ID not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const chat = await chatsService.getChatByIdWithMessages(chatID);
      if (!chat) {
        const error = new Error('Chat not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }

      if (chat.author_id === author_id) {
        callback(null, chat);
      } else {
        const error = new Error('PERMISSION_DENIED');
        error.code = grpc.status.PERMISSION_DENIED;
        callback(error);
      }
    } catch (e) {
      console.log(e);
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },

  SendMessage: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { chat_id: id, body } = call.request;

    /// Проверка на пустые поля
    const chat_id = Number(id);
    if (!chat_id) {
      const error = new Error('Chat ID not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }
    if (!body) {
      const error = new Error('Body is emty');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const chat = await chatsService.getChatByIdWithMessages(chat_id);
      if (!chat) {
        const error = new Error('Chat not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }

      await chatsService.createMessage({
        chat_id,
        author_id,
        body,
      });
      callback(null, { message: 'Success' });
    } catch (e) {
      console.log(e);
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },

  DeleteMessage: async (call, callback) => {
    const author_id = utils.getIdFromMetadata(call, callback);
    if (!author_id) {
      return;
    }

    const { id } = call.request;

    /// Проверка на пустые поля
    const messageID = Number(id);
    if (!messageID) {
      const error = new Error('Message ID not found');
      error.code = grpc.status.INVALID_ARGUMENT;
      callback(error);
      return;
    }

    try {
      const message = await chatsService.getMessageByID(messageID);
      if (!message) {
        const error = new Error('Message not found');
        error.code = grpc.status.NOT_FOUND;
        callback(error);
        return;
      }
      if (message.author_id === author_id) {
        await chatsService.deleteMessageByID(messageID);
        callback(null, { message: 'Success' });
      } else {
        const error = new Error('PERMISSION_DENIED');
        error.code = grpc.status.PERMISSION_DENIED;
        callback(error);
      }
    } catch (e) {
      console.log(e);
      const error = new Error('Internal error');
      error.code = grpc.status.INTERNAL;
      callback(error);
      return;
    }
  },
});

// Запуск сервера
const PORT = '50052';
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
