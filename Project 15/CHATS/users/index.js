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

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
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

const deleteUserByID = async (id) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

export default {
  createUser,
  findUser,
  getUserByID,
  deleteUserByID,
  updateUser,
};
