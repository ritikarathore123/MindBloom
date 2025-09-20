import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController.js";

import { authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", authAdmin, createExercise);


router.get("/", getAllExercises);

router.get("/:id", getExerciseById);

router.put("/:id", authAdmin, updateExercise);


router.delete("/:id", authAdmin, deleteExercise);

export default router;