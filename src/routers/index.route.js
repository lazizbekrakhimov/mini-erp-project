import { Router } from "express";

import adminRouter from "../controllers/admin.controller.js"

const router = Router();

router.use('/admin', adminRouter);

export default router;