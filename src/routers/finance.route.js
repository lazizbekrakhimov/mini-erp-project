import { Router } from "express";
import controller from "../controllers/finance.controller.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

router.get("/", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.ACCOUNTANT), controller.findAll);
router.get("/summary", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.summary);

export default router;