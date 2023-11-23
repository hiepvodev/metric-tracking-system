import { Router } from "express";
import AuthServices from "../../services/auth/auth.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import BadRequest from "../../errors/badRequest.js";
import 'express-async-errors';

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Email and password are required");
    }
    const result = await AuthServices.login(email, password);
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Email and password are required");   
    }
    const result = await AuthServices.register(email, password);
    return sendResponse(res, StatusCodes.CREATED, result, ReasonPhrases.CREATED);    
});

export default router;