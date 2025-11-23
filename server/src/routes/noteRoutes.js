import express from "express";
import {
  createNote,
  getNotesByUser,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";

const router = express.Router();

// POST /api/notes
router.post("/", createNote);

// GET /api/notes/single/:id (must come before /:userId to avoid route conflicts)
router.get("/single/:id", getNoteById);

// GET /api/notes/:userId
router.get("/:userId", getNotesByUser);

// PUT /api/notes/:id
router.put("/:id", updateNote);

// DELETE /api/notes/:id
router.delete("/:id", deleteNote);

export default router;

