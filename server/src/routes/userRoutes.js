import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Health/test endpoint
router.get("/test", (req, res) => {
  res.send("✅ User routes are working fine!");
});

// Auth endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

