import { Router } from "express";
import { updateComment, deleteComment } from "../controllers/commentControlller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);

export default router;
