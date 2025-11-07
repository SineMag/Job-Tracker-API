import { Router } from "express";
import { createProject, getProjects, assignUserToProject, removeUserFromProject } from "../controllers/projectController";
import { getProjectStats } from "../controllers/statsController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

import { validateProjectCreation } from "../middleware/validators";

router.post("/", protect, validateProjectCreation, createProject);
router.get("/", protect, getProjects);
router.post("/:id/members", protect, assignUserToProject);
router.delete("/:id/members/:userId", protect, removeUserFromProject);
router.get("/:id/stats", protect, getProjectStats);

export default router;