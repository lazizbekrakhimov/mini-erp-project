import { Router } from "express";

import adminRouter from "../routers/admin.route.js";
import categoryRouter from "../routers/category.route.js";
import productRouter from "../routers/product.route.js";
import stockRouter from "../routers/stock.route.js";
import partnerRouter from "./partner.route.js";
import saleRouter from "../routers/sale.route.js";
import purchaseRouter from "../routers/purchase.route.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/admin", adminRouter);
router.use("/stock", stockRouter);
router.use("/partners", partnerRouter);
router.use("/sales", saleRouter);
router.use("/purchase", purchaseRouter)

export default router