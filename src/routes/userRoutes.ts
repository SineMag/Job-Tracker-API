import { Router } from "express";
import { getUserById, updateUser, deleteUser } from "../controllers/userController";
import { getUserActivity } from "../controllers/notificationController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.get("/:id/notifications", protect, getUserActivity);

export default router;