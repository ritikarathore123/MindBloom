// import express from "express";
// import {
//   createExercise,
//   getAllExercises,
//   getExerciseById,
//   updateExercise,
//   deleteExercise,
// } from "../controllers/exerciseController.js";

// import { authAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();


// router.post("/", authAdmin, createExercise);


// router.get("/", getAllExercises);

// router.get("/:id", getExerciseById);

// router.put("/:id", authAdmin, updateExercise);


// router.delete("/:id", authAdmin, deleteExercise);

// export default router;

// import express from "express";
// import {
//   createExercise,
//   getAllExercises,
//   getExerciseById,
//   updateExercise,
//   deleteExercise,
//   createMultipleExercises,
// } from "../controllers/exerciseController.js";



// const router = express.Router();
// router.post("/bulk", createMultipleExercises);

// router.post("/", createExercise);


// router.get("/", getAllExercises);

// router.get("/:id", getExerciseById);

// router.put("/:id",  updateExercise);


// router.delete("/:id", deleteExercise);

// export default router;

import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  createMultipleExercises,
} from "../controllers/exerciseController.js";

const router = express.Router();

// Bulk insert
router.post("/bulk", createMultipleExercises);

// Single insert
router.post("/", createExercise);

// Get all
router.get("/", getAllExercises);

// Get by ID
router.get("/:id", getExerciseById);

// Update
router.put("/:id", updateExercise);

// Delete
router.delete("/:id", deleteExercise);

export default router;