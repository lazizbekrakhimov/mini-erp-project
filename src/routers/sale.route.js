import { Router } from "express";
import saleController from "../controllers/sale.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import saleValidator from "../validations/sale.validation.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

// Sale
router.post("/", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER, Roles.ACCOUNTANT, Roles.SALES), validator(saleValidator.create), saleController.create);
router.get("/", authGuard, saleController.findAll);
router.get("/:id", authGuard, saleController.findOne);
router.patch("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER, Roles.ACCOUNTANT, Roles.SALES), validator(saleValidator.update), saleController.update);
router.delete("/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), saleController.remove);

// SaleItem
router.post("/items", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(saleValidator.createItem), saleController.saleItemController.create);
router.get("/items", authGuard, saleController.saleItemController.findAll);
router.get("/items/:id", authGuard, saleController.saleItemController.findOne);
router.patch("/items/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.MANAGER), validator(saleValidator.updateItem), saleController.saleItemController.update);
router.delete("/items/:id", authGuard, roleGuard(Roles.SUPERADMIN, Roles.ADMIN), saleController.saleItemController.remove);

export default router;