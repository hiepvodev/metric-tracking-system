import express from 'express';
import indexRouter from './routes/index.js';
import sendResponse from './utils/responseSender.js';
import cors from 'cors';
import {
	StatusCodes,
} from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", indexRouter);

// Error Handling middleware
app.use((err, req, res, next) => {
    const errMsg = err
      ? err.toString().split("Error: ")[1]
      : "Something went wrong";
    sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, errMsg);
  });

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}: http://localhost:${PORT}/api/v1/`);
});
