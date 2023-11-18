import express from "express";
import UserService from "./user.services.js";
import asyncWrapper from "../../utils/wrapper.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

const router = express.Router();

router.get("/", asyncWrapper(async (req, res, next) => {
  const result = await UserService.getAll();
  sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
}));

router.get("/:id", asyncWrapper(async (req, res, next) => {
  const result = await UserService.getById(req.params.id);
  sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
}));

router.put("/:id", asyncWrapper(async (req, res, next) => {
  const result = await UserService.updateById(req.params.id, req.body);
  sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
}));

export default router;