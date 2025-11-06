import { Router } from "express";
import {
  addApplication,
  getApplicationById,
  getApplications,
  updateApplicationById,
  deleteApplicationById,
} from "../controllers/applicationControllers";

const router = Router();

router.post("/applications", addApplication);
router.get("/applications", getApplications);
router.get("/applications/:id", getApplicationById);
router.put("/applications/:id", updateApplicationById);
router.delete("/applications/:id", deleteApplicationById);

export default router;
