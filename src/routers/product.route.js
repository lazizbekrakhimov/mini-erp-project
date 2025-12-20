import { Router } from "express";
import controller from "../controllers/product.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import productValid from "../validations/product.validation.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

router.post("/", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(productValid.create), controller.create);
router.get("/", authGuard, controller.findAll);
router.get("/:id", authGuard, controller.findOne);
router.patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(productValid.update), controller.update);
router.delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.remove);

export default router;