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

router.post("/applications", addApplication);
router.get("/applications", getApplications);
router.get("/applications/:id", getApplicationById);
router.put("/applications/:id", updateApplicationById);
router.delete("/applications/:id", deleteApplicationById);

export default router;
