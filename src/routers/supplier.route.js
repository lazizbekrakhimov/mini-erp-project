import { Router } from "express";
import controller from "../controllers/supplier.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import supplierValid from "../validations/supplier.validation.js";

const router = Router();

router
    .post("/", validator(supplierValid.create), controller.create)
    .get("/", controller.findAll)
    .get("/:id", controller.findOne)
    .patch("/:id", validator(supplierValid.update), controller.update)
    .delete("/:id", controller.remove);

export default router;