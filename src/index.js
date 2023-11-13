import express from 'express';
import indexRouter from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

app.use((err, req, res, next) => {
    const errMsg = err
      ? err.toString().split("Error: ")[1]
      : "Something went wrong";
    res.status(500).json({ data: "", msg: errMsg });
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}: http://localhost:${PORT}/api/v1/`);
});
