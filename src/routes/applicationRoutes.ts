import { Router } from "express";
import {
  addApplication,
  getApplicationById,
  getApplications,
  updateApplicationById,
  deleteApplicationById,
} from "../controllers/applicationControllers";

import { protect} from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/", addApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplicationById);
router.delete("/:id", deleteApplicationById);

export default router;
