// import express from "express";
// import {
//   getAllResources,
//   createResource,
//   updateResource,
//   deleteResource,
// } from "../controllers/resourceController.js";
// // import { authAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();


// router.get("/", getAllResources);


// router.post("/", authAdmin, createResource);


// router.put("/:id", authAdmin, updateResource);


// router.delete("/:id", authAdmin, deleteResource);

// export default router;

import express from "express";
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";
// import { authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllResources);


router.post("/", createResource);


router.put("/:id", updateResource);


router.delete("/:id", deleteResource);

export default router;