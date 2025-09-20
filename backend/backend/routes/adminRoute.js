
import { Router } from "express";
import { registerAdmin, loginAdmin, logoutAdmin, getAdminProfile } from "../controllers/adminController.js";
import { authAdmin } from "../middleware/authMiddleware.js";


const router = Router();


router.post("/register", registerAdmin); 
router.post("/login", loginAdmin); 
router.post("/logout", logoutAdmin); 
router.get("/profile", authAdmin, getAdminProfile); 


export default router;