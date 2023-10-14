import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createChat = async ({ name, author_id }) => {
  return prisma.chat.create({
    data: {
      name,
      author_id,
    },
  });
};

const listChats = async (author_id) => {
  return prisma.chat.findMany({
    where: {
      author_id,
    },
    select: {
      id: true,
      name: true,
      author_id: true,
      messages: false,
    },
  });
};

const getChatByID = async (id) => {
  return prisma.chat.findUnique({
    where: {
      id,
    },
  });
};

const getChatByIdWithMessages = async (id) => {
  return prisma.chat.findUnique({
    where: {
      id,
    },
    include: { messages: true },
  });
};

const deleteChatByID = async (id) => {
  return prisma.chat.delete({
    where: {
      id,
    },
  });
};

const createMessage = async ({ chat_id, author_id, body }) => {
  return prisma.message.create({
    data: {
      chat_id,
      author_id,
      body,
    },
  });
};

const getMessageByID = async (id) => {
  return prisma.message.findUnique({
    where: {
      id,
    },
  });
};

const deleteMessageByID = async (id) => {
  return prisma.message.delete({
    where: {
      id,
    },
  });
};

export default {
  createChat,
  listChats,
  getChatByID,
  getChatByIdWithMessages,
  deleteChatByID,
  createMessage,
  getMessageByID,
  deleteMessageByID,
};
