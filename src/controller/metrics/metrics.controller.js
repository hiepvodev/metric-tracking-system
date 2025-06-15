import express from "express";
import MetricService from "../../services/metrics/metric.services.js";
import sendResponse from "../../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import 'express-async-errors';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await MetricService.getAll(req.query);

    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
  } catch (err) {
    return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {}, err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await MetricService.create(req.body);

    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
  } catch (err) {
    return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {}, err.message);
  }
});

router.get("/chart", async (req, res) => {
  try {
    const result = await MetricService.getMetricChart(req.query);
    
    return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
  } catch (err) {
    return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {}, err.message);
  }
});

export default router;