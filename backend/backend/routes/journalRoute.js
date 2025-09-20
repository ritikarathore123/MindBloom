import express from "express";
import {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

import { authUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", authUser, createJournal);

router.get("/", authUser, getJournals);

router.put("/:id", authUser, updateJournal);

router.delete("/:id", authUser, deleteJournal);

export default router;