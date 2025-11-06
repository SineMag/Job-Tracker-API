import { Router } from "express";
import { addApplication, getApplications } from "../controllers/applicationControllers";

const router = Router();

router.post("/applications", addApplication);
router.get('/applications', getApplications);

export default router;
