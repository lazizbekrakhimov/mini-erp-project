import { Router } from "express";
import controller from "../controllers/payment.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import paymentValid from "../validations/payment.validation.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

router.post("/", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.ACCOUNTANT), validator(paymentValid.create), controller.create);
router.get("/", authGuard, controller.findAll);
router.get("/:id", authGuard, controller.findOne);

export default router;