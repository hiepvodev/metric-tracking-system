import { Router } from "express";
import AuthServices from "../../services/auth/auth.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import BadRequest from "../../errors/badRequest.js";
import 'express-async-errors';
import { refreshTokenHandler } from "../../middleware/authHandler.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        throw new BadRequest("Email and password are required");
    }
    const result = await AuthServices.login(email, password);
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        throw new BadRequest("Email and password are required");   
    }
    const result = await AuthServices.register(email, password);
    return sendResponse(res, StatusCodes.CREATED, result, ReasonPhrases.CREATED);    
});

router.post("/refresh-token", async (req, res) => {
    const { refreshToken } = req.body;
    // Check if refresh token is provided
    if (!refreshToken) {
        throw new Unauthenticated("No refresh token provided");
    }
    const result = await refreshTokenHandler(refreshToken);
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);    
})

export default router;