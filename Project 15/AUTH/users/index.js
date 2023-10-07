import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async ({ username, email, password }) => {
  return prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
};

const findUser = async (identifier) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        {
          username: identifier,
        },
        {
          email: identifier,
        },
      ],
    },
  });
};

const getUserByID = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export default {
  createUser,
  findUser,
  getUserByID,
};
