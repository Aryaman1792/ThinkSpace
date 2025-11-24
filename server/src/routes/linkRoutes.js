import express from "express";
import {
  updateLinksForNote,
  getBacklinks
} from "../controllers/linkController.js";

const router = express.Router();

// POST /api/links/updateLinksForNote
router.post("/updateLinksForNote", updateLinksForNote);

// GET /api/links/backlinks/:noteId
router.get("/backlinks/:noteId", getBacklinks);

export default router;

