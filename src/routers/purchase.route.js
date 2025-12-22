import { Router } from "express";
import controller from "../controllers/purchase.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import purchaseValid from "../validations/purchase.validation.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

router.post("/", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(purchaseValid.create), controller.create);
router.get("/", authGuard, controller.findAll);
router.get("/:id", authGuard, controller.findOne);
router.patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(purchaseValid.update), controller.update);
router.delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.remove);
router.patch("/:id/lock", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), controller.lock);
router.patch("/:id/unlock", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), controller.unlock);

export default router;