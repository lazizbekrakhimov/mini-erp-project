import { BaseController } from "./base.controller.js";
import Stock from "../schemas/stock.schema.js";
import Product from "../schemas/product.schema.js";
import { ApiError } from "../utils/custom-error.js";

class StockController extends BaseController {
    constructor() {
        super(Stock, "product_id");
    }

    create = this._wrap(async (req, res) => {
        const { product_id } = req.body;
        const product = await Product.findById(product_id);
        if (!product) {
            throw new ApiError("Product not found", 404);
        }
        await this._isExist(
            { product_id },
            "Stock for this product"
        );
        const data = await this.model.create(req.body);
        return this._success(res, data, 201);
    });
}

export default new StockController();