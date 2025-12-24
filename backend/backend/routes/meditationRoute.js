

// import express from "express";
// import {
//   createMeditation,
//   getMeditations,
//   getMeditationById,
//   deleteMeditation
// } from "../controllers/meditationController.js";

// import { authAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();


// router.post("/", authAdmin, createMeditation);


// router.get("/", getMeditations);


// router.get("/:id", getMeditationById);
// router.delete("/:id", authAdmin, deleteMeditation);

// export default router;




import express from "express";
import {
  createMeditation,
  getMeditations,
  getMeditationById,
  deleteMeditation
} from "../controllers/meditationController.js";



const router = express.Router();


router.post("/", createMeditation);


router.get("/", getMeditations);


router.get("/:id", getMeditationById);
router.delete("/:id", deleteMeditation);

export default router;
