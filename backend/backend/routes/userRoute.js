import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, deleteUser ,updateUserProfile} from "../controllers/userController.js";
import { authUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);


router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", authUser, getUserProfile);

// Delete current authenticated user
router.delete("/delete", authUser, deleteUser);

// Delete specific user by id (useful for Postman/admin testing)
router.delete("/delete/:id", authUser, deleteUser);

router.put("/profile", authUser, updateUserProfile);
export default router;


