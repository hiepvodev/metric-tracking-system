import express from "express";
import userController from "../modules/users/user.controller.js";
import authController from "../modules/auth/auth.controller.js";
import sendResponse from "../utils/responseSender.js";
import {
	StatusCodes,
} from 'http-status-codes';

const router = express.Router();

router.get("/", (req, res, next) => {
  sendResponse(res, StatusCodes.OK, result, "API Router is working");
});

router.use("/users", userController);
router.use("/auth", authController);

router.all("*", (req, res, next) => {
  sendResponse(res, StatusCodes.NOT_FOUND, null, "API endpoint not found");
});

export default router;
