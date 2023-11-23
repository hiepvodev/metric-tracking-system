import express from "express";
import UserService from "../../services/users/user.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import NotFound from "../../errors/notFound.js";
import authHandler from "../../middleware/authHandler.js";
import 'express-async-errors';

const router = express.Router();

router.get("/", authHandler, async (req, res) => {
  const result = await UserService.getAll();
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.get("/:id", authHandler, async (req, res) => {
  const result = await UserService.getById(req.params.id);
  if (!result) {
    throw new NotFound("User not found");
  }
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.put("/:id", authHandler, async (req, res) => {
  const existingUser = await UserService.getById(req.params.id);
  const tokenisedUser = req.user;
  if (existingUser.id !== tokenisedUser.id) {
    throw new NotFound("User not found");
  }
  const result = await UserService.updateById(req.params.id, req.body);
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

export default router;