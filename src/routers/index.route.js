import { Router } from "express";

import adminRouter from "../routers/admin.route.js";
import categoryRouter from "../routers/category.route.js";
import productRouter from "../routers/product.route.js";
import stockRouter from "../routers/stock.route.js";
import supplierRouter from "../routers/supplier.route.js";
import customerRouter from "../routers/customer.route.js";
import saleRouter from "../routers/sale.route.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/admin", adminRouter);
router.use("/stock", stockRouter);
router.use("/supplier", supplierRouter);
router.use("/customer", customerRouter);
router.use("/sale", saleRouter);

export default router