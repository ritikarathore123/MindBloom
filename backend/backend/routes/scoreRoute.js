import express from "express";
import {
  getAllScores,
  getScoreByRange,
  createScore,
  submitUserScore,
} from "../controllers/scoreController.js";
import { authUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all scores
router.get("/", getAllScores);

// Get score by range (example: /api/score/range/12)
router.get("/range/:range", getScoreByRange);

// Create new score entries (expects array of scores in req.body)
router.post("/", createScore);

// Save computed score for current user and link to profile
router.post("/submit", authUser, submitUserScore);

export default router;
