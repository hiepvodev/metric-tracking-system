import CustomAPIError from '../errors/customError.js';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../utils/responseSender.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return sendResponse(res, err.statusCode, null, err.message)
  }
  return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, "Something went wrong try again later");
}

export default errorHandler;
