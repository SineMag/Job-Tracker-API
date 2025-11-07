import { Router } from "express";
import {
  createSubmission,
  getSubmissionsByProject,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
} from "../controllers/submissionController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createSubmission);
router.get("/project/:id", protect, getSubmissionsByProject);
router.get("/:id", protect, getSubmissionById);
router.put("/:id/status", protect, updateSubmissionStatus);
router.delete("/:id", protect, deleteSubmission);

export default router;
