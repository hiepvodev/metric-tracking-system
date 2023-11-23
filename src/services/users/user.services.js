import prisma from "../../database/prisma.js";

const create = async (payload) => {
  return prisma.user.create({ data: payload });
};

const getAll = async () => {
  return prisma.user.findMany();
};

const getById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateById = async (id, payload) => {
  return prisma.user.update({ where: { id }, data: payload });
};

const deleteById = async (id) => {
  return prisma.user.delete({ where: { id } });
};

const findByEmail = (email) => {
  return prisma.user.findFirst({ where: { email } });
};

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  findByEmail,
};