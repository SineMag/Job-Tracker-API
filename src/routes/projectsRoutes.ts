import { Router } from "express";
import { createProject, getProjects, assignUserToProject, removeUserFromProject } from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/:id/members", protect, assignUserToProject);
router.delete("/:id/members/:userId", protect, removeUserFromProject);

export default router;
