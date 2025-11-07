import { Router } from "express";
import { getUserById, updateUser, deleteUser } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
