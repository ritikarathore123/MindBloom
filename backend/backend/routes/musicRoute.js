


// import express from "express";
// import { getMusicList, getMusicById, createMusic ,deleteMusic} from "../controllers/musicController.js";
// import { authAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();



// router.post("/", authAdmin, createMusic);

// router.get("/", getMusicList);


// router.get("/:id", getMusicById);
// router.delete("/:id", deleteMusic);


// export default router;





import express from "express";
import { getMusicList, getMusicById, createMusic ,deleteMusic} from "../controllers/musicController.js";


const router = express.Router();



router.post("/", createMusic);

router.get("/", getMusicList);


router.get("/:id", getMusicById);
router.delete("/:id", deleteMusic);


export default router;