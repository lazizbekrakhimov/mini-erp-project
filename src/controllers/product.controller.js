import Product from '../schemas/product.schema.js';
import { BaseController } from './base.controller.js';
import { catchAsync } from '../middlewares/catch-async.js';
import { ApiError } from '../utils/custom-error.js';
import { successRes } from '../utils/success-response.js';

class ProductController extends BaseController {
    create = catchAsync(async (req, res) => {
        await this._isExist({ name: req.body?.name }, 'Product');
        await this._isExist({ sku: req.body?.sku }, 'Product');
        const product = await Product.create(req.body);
        return successRes(res, product, 201);
    });

    update = catchAsync(async (req, res) => {
        const id = req.params?.id;
        const product = await this._getById(id);
        if (!product || product.deleted_at) throw new ApiError('Product not found', 404);

        const { name, sku } = req.body;
        if (name) {
            const existName = await Product.findOne({ name });
            if (existName && existName.id != id) {
                throw new ApiError('Product name already exists', 409);
            }
        }
        if (sku) {
            const existSKU = await Product.findOne({ sku });
            if (existSKU && existSKU.id != id) {
                throw new ApiError('Product SKU already exists', 409);
            }
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        return successRes(res, updatedProduct);
    });
    // SOFT DELETE
    remove = catchAsync(async (req, res) => {
        const id = req.params?.id;
        const product = await Product.findById(id);
        if (!product || product.deleted_at) throw new ApiError('Product not found', 404);
        product.deleted_at = new Date();
        await product.save();
        return successRes(res, product, 200);
    });
    // REATIVATE
    reactivate = catchAsync(async (req, res) => {
        const id = req.params?.id;
        const product = await Product.findById(id);
        if (!product) throw new ApiError('Product not found', 404);
        if (!product.deleted_at) throw new ApiError('Product is already active', 400);

        product.deleted_at = null;
        await product.save();

        return successRes(res, product, 200);
    });
}

export default new ProductController(Product, 'category');