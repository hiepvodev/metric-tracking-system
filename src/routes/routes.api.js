import express from "express";
import userController from "../controller/users/user.controller.js";
import authController from "../controller/auth/auth.controller.js";
import postController from "../controller/post/post.controller.js";
import sendResponse from "../utils/responseSender.js";
import {
	StatusCodes,
} from 'http-status-codes';

const router = express.Router();

router.get("/", (req, res) => {
  return sendResponse(res, StatusCodes.OK, null, "API Router is working");
});

router.use("/users", userController);
router.use("/auth", authController);
router.use("/posts", postController);

router.all("*", (req, res) => {
  return sendResponse(res, StatusCodes.NOT_FOUND, null, `Can't find ${req.originalUrl} on this server!`);
});

export default router;
