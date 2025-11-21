import express from "express";
import { createReflection, getReflections } from "../controllers/reflectionController.js";

const router = express.Router();

// GET /api/reflection/:userId
router.get("/:userId", getReflections);

// POST /api/reflection
router.post("/", createReflection);

export default router;

