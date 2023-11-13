import express from "express";
import Controller from "./user.controller.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await Controller.getAll();
        res.json({ data: result, msg: "success" });
    } catch (e) {
        next(e);
    }
})

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await Controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

export default router;