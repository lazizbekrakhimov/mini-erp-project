import { Router } from "express";

import stock from "../controllers/stock.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import stockValid from "../validations/stock.validation.js"

const router = Router();

router
    .post("/", validator(stockValid.create), stock.create)
    .get("/", stock.findAll)
    .get("/:id", stock.findOne)
    .patch("/:id", validator(stockValid.update), stock.update)
    .delete("/:id", stock.remove)

export default router