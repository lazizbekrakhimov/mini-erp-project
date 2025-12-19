import { Router } from "express";

import customerController from "../controllers/customer.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import customerValidation from "../validations/customer.validation.js";

const router = Router();

router.post("/", validator(customerValidation.create), customerController.create);  
router.get("/", customerController.findAll);  
router.get("/:id", customerController.findOne);  
router.patch("/:id", validator(customerValidation.update), customerController.update);  
router.delete("/:id", customerController.remove);  
router.patch("/:id/block", customerController.block);  
router.patch("/:id/activate", customerController.activate);
router.patch("/:id/inactivate", customerController.inactivate);

export default router;