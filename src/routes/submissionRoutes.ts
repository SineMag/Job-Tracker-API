import { Router } from "express";
import {
  createSubmission,
  getSubmissionsByProject,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
} from "../controllers/submissionController";
import { createComment, getCommentsBySubmission } from "../controllers/commentControlller";
import { approveSubmission, requestChanges, getReviewHistory } from "../controllers/reviewController";
import { validateSubmissionCreation, validateCommentCreation } from "../middleware/validators";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, validateSubmissionCreation, createSubmission);
router.get("/project/:id", protect, getSubmissionsByProject);
router.get("/:id", protect, getSubmissionById);
router.put("/:id/status", protect, updateSubmissionStatus);
router.delete("/:id", protect, deleteSubmission);

// Comment routes
router.post("/:id/comments", protect, validateCommentCreation, createComment);
router.get("/:id/comments", protect, getCommentsBySubmission);

// Review routes
router.post("/:id/approve", protect, approveSubmission);
router.post("/:id/request-changes", protect, requestChanges);
router.get("/:id/reviews", protect, getReviewHistory);

export default router;
