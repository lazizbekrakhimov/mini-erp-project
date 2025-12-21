import { Router } from "express";
import controller from "../controllers/partner.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import partnerValid from "../validations/partner.validation.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

router.post("/", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(partnerValid.create), controller.create);
router.get("/", authGuard, controller.findAll);
router.get("/:id", authGuard, controller.findOne);
router.patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(partnerValid.update), controller.update);
router.delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.remove);
router.patch("/:id/block", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.block);
router.patch("/:id/activate", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.activate);
router.patch("/:id/inactivate", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.inactivate);

export default router;