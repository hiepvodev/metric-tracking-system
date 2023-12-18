import express from "express";
import UserService from "../../services/users/user.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import { authHandler, verifyRoles } from "../../middleware/authHandler.js";
import 'express-async-errors';
import NotFound from "../../errors/notFound.js";

const router = express.Router();

// anyone can view all users
router.get("/", authHandler, async (req, res) => {
  // Get all users
  const result = await UserService.getAll();
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// loggedin user can only view their own user's data
router.get("/:id", authHandler, async (req, res) => {
  // Check if user exists
  const result = await UserService.getById(req.params.id);
  if (!result) {
    throw new NotFound("User not found");
  }
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// only admin can modify user data
router.put("/:id", authHandler, verifyRoles(['ADMIN']), async (req, res) => {
  // Check if user exists
  const existingUser = await UserService.getById(req.params.id);
  if (!existingUser) {
    throw new NotFound("User not found");
  }
  // Update user
  const result = await UserService.updateById(req.params.id, req.body);
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// only admin can delete user
router.delete("/:id", authHandler, verifyRoles(['ADMIN']), async (req, res) => {
  // Check if user exists
  const existingUser = await UserService.getById(req.params.id);
  if (!existingUser) {
    throw new NotFound("User not found");
  }
  // Delete user
  const result = await UserService.deleteById(req.params.id);
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

export default router;