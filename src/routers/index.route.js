import { Router } from "express";

import adminRouter from "../routers/admin.route.js";
import categoryRouter from "../routers/category.route.js";
import productRouter from "../routers/product.route.js";
<<<<<<< HEAD
=======
import stockRouter from "../routers/stock.route.js";
import supplierRoute from "../routers/supplier.route.js";
>>>>>>> 96910b0 (supplier)

const router = Router();

router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/admin", adminRouter);
<<<<<<< HEAD
=======
router.use("/stock", stockRouter);
router.use("/suppliers", supplierRoute);
>>>>>>> 96910b0 (supplier)

export default router