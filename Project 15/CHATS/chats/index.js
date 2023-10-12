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

const deleteChatByID = async (id) => {
  return prisma.chat.delete({
    where: {
      id,
    },
  });
};

export default {
  createChat,
  listChats,
  getChatByID,
  deleteChatByID,
};
