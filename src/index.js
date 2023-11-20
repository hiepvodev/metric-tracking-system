import express from 'express';
import indexRouter from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", indexRouter);

// Error Handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}: http://localhost:${PORT}/api/v1/`);
});
