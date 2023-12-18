import express from "express";
import PostService from "../../services/posts/post.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import NotFound from "../../errors/notFound.js";
import BadRequest from "../../errors/badRequest.js";
import { authHandler, verifyResourceOwnerOrAdmin } from "../../middleware/authHandler.js";
import 'express-async-errors';

const router = express.Router();

// anyone can view all posts
router.get("/", async (req, res) => {
    // Get all posts
    const result = await PostService.getAllPosts();
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// loggedin user can create new post
router.post("/", authHandler, async (req, res) => {
    // Create new post
    const { title, content } = req.body;
    if (!title || !content) {
        throw new BadRequest("Title and content are required");
    }
    const result = await PostService.createPost({ title, content, authorId: req.user.id});
    return sendResponse(res, StatusCodes.CREATED, result, ReasonPhrases.CREATED);
});

// anyone can view post by id
router.get("/:id", async (req, res) => {
    // get post by id
    const result = await PostService.getByPostId(req.params.id);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// anyone can view posts by user id
router.get("/user/:id", async (req, res) => {
    // get posts by user id
    const result = await PostService.findByUserId(req.params.id);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// loggedin user can update their own post
// or admins can update any post
router.put("/:id", authHandler, verifyResourceOwnerOrAdmin, async (req, res) => {
    // Update post
    const result = await PostService.updateByPostId(req.params.id, req.body);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// loggedin user can delete their own post
// or admins can delete any post
router.delete("/:id", authHandler, verifyResourceOwnerOrAdmin, async (req, res) => {
    // Delete post
    const result = await PostService.deleteByPostId(req.params.id);
    if (!result) {
        throw new NotFound("Post not found");
    }
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

export default router;