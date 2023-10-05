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

export default {
  createUser,
  findUser,
};
