import express from "express";
import PostService from "../../services/posts/post.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import NotFound from "../../errors/notFound.js";
import { authHandler } from "../../middleware/authHandler.js";
import 'express-async-errors';

const router = express.Router();

router.get("/", async (req, res) => {
    // Get all posts
    const result = await PostService.getAllPosts();
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.post("/", authHandler, async (req, res) => {
    // Create new post
    const { title, content } = req.body;
    if (!title || !content) {
        throw new NotFound("Title and content are required");
    }
    const result = await PostService.createPost({ title, content, authorId: req.user.id});
    return sendResponse(res, StatusCodes.CREATED, result, ReasonPhrases.CREATED);
});

router.get("/:id", async (req, res) => {
    // get post by id
    const result = await PostService.getByPostId(req.params.id);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.get("/user/:id", async (req, res) => {
    // get posts by user id
    const result = await PostService.findByUserId(req.params.id);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.put("/:id", authHandler, async (req, res) => {
    // Update post
    const existingPost = await PostService.getByPostId(req.params.id);
    const tokenisedUser = req.user;
    // Check if user is trying to update their own post
    if (existingPost.authorId !== tokenisedUser.id) {
        throw new NotFound("Post not found");
    }
    // Update post
    const result = await PostService.updateByPostId(req.params.id, req.body);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.delete("/:id", authHandler, async (req, res) => {
    // Delete post
    const existingPost = await PostService.getByPostId(req.params.id);
    const tokenisedUser = req.user;
    // Check if user is trying to delete their own post
    if (existingPost.authorId !== tokenisedUser.id) {
        throw new NotFound("Post not found");
    }
    // Delete post
    const result = await PostService.deleteByPostId(req.params.id);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

export default router;