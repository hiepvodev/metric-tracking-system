import { Router } from "express";
import AuthServices from "./auth.services.js";
import asyncWrapper from "../../utils/wrapper.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

const router = Router();

router.post("/login", asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const result = await AuthServices.login(email, password);
    sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
}));

router.post("/register", asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const result = await AuthServices.register(email, password);
    sendResponse(res, StatusCodes.CREATED, result, ReasonPhrases.CREATED);    
}));

export default router;