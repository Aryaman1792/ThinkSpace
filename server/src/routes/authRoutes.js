import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register → registerUser
router.post("/api/auth/register", registerUser);

// POST /api/auth/login → loginUser
router.post("/api/auth/login", loginUser);

export default router;


