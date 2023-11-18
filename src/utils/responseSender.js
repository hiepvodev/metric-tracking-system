export default function sendResponse(res, statusCode, payload, msg) {
    res.status(statusCode).json({ payload, msg, statusCode });
}