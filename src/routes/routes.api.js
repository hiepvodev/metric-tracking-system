import express from "express";
import userRouter from "../modules/users/user.routes.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "API Router is working" });
});

router.use("/users", userRouter);

router.all("*", (req, res, next) => {
  res.json({ data: "", msg: "Route not found..." });
});

export default router;
