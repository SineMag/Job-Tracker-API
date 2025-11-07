import { Router } from "express";
import { register, login } from "../controllers/authController"

const router = Router();

import { validateRegistration } from "../middleware/validators";

router.post('/register', validateRegistration, register);
router.post('/login', login);

export default router;