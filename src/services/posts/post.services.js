import prisma from "../../database/prisma.js";

const createPost = async (payload) => {
    return prisma.post.create({ data: payload });
};

const getAllPosts = async () => {
    return prisma.post.findMany();
};

const getByPostId = (id) => {
    return prisma.post.findUnique({ where: { id } });
};

const updateByPostId = async (id, payload) => {
    return prisma.post.update({ where: { id }, data: payload });
};

const deleteByPostId = async (id) => {
    return prisma.post.delete({ where: { id } });
};

const findByUserId = (id) => {
    return prisma.post.findMany({ where: { author: { id } } });
};

export default { createPost, getAllPosts, getByPostId, updateByPostId, deleteByPostId, findByUserId };