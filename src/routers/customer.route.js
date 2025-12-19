import { Router } from "express";

import customerController from "../controllers/customer.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"; /// bu to'liq emas
import roleMiddleware from "../middlewares/role.middleware.js"; /// bu ham to'liq emas
import { Roles } from "../enums/const-roles.js";

const router = Router(); router.use(authMiddleware);

router.post("/", roleMiddleware([Roles.ADMIN, Roles.MANAGER]), customerController.create);  
router.get("/", customerController.findAll);  
router.get("/:id", customerController.findOne);  
router.put("/:id", roleMiddleware([Roles.ADMIN, Roles.MANAGER]), customerController.update);  
router.delete("/:id", roleMiddleware([Roles.ADMIN]), customerController.remove);  
router.patch("/:id/block", roleMiddleware([Roles.ADMIN]), customerController.block);  
router.patch("/:id/activate", roleMiddleware([Roles.ADMIN]), customerController.activate);

export default router;
