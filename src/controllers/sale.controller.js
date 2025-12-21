import { BaseController } from "./base.controller.js";
import { catchAsync } from "../middlewares/catch-async.js";
import Sale from "../schemas/sale.schema.js";
import SaleItem from "../schemas/sale-item.schema.js";
import { successRes } from "../utils/success-response.js";
import { ApiError } from "../utils/custom-error.js";

export class SaleController extends BaseController {
    create = catchAsync(async (req, res) => {
        const { items, ...saleData } = req.body;
        const sale = await Sale.create(saleData);
        if (items && items.length) {
            const saleItems = items.map(i => ({ ...i, sale: sale._id }));
            await SaleItem.insertMany(saleItems);
        }
        const result = await Sale.findById(sale._id)
            .populate("customer")
            .populate("items");
        return successRes(res, result, 201);
    });

    findAll = catchAsync(async (req, res) => {
        const sales = await Sale.find()
            .populate("customer")
            .populate("items");
        return successRes(res, sales);
    });

    findOne = catchAsync(async (req, res) => {
        const id = req.params.id;
        const sale = await Sale.findById(id)
            .populate("customer")
            .populate("items");
        if (!sale) throw new ApiError("Sale not found", 404);
        return successRes(res, sale);
    });

    update = catchAsync(async (req, res) => {
        const id = req.params.id;
        const sale = await Sale.findById(id);
        if (!sale) throw new ApiError("Sale not found", 404);
        if (sale.is_locked) throw new ApiError("Sale is locked", 403);
        const { items, ...updateData } = req.body;
        Object.assign(sale, updateData);
        await sale.save();
        if (items && items.length) {
            await SaleItem.deleteMany({ sale: sale._id });
            const saleItems = items.map(i => ({ ...i, sale: sale._id }));
            await SaleItem.insertMany(saleItems);
        }
        const result = await Sale.findById(sale._id)
            .populate("customer")
            .populate("items");
        return successRes(res, result);
    });

    remove = catchAsync(async (req, res) => {
        const id = req.params.id;
        const sale = await Sale.findById(id);
        if (!sale) throw new ApiError("Sale not found", 404);
        if (sale.is_locked) throw new ApiError("Sale is locked", 403);
        // Sale items ni o'chirish
        await SaleItem.deleteMany({ sale: sale._id });
        // Sale ni o'chirish (deleteOne bilan)
        await sale.deleteOne();
        return successRes(res, {});
    });

}

export default new SaleController(Sale, "items");