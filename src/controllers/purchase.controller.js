import { catchAsync } from "../middlewares/catch-async.js";
import Purchase from "../schemas/purchase.schema.js";
import PurchaseItem from "../schemas/purchase-item.schema.js";
import { successRes } from "../utils/success-response.js";
import { ApiError } from "../utils/custom-error.js";

export class PurchaseController {
    create = catchAsync(async (req, res) => {
        const { items, ...purchaseData } = req.body;
        const purchase = await Purchase.create(purchaseData);
        if (items && items.length) {
            const purchaseItems = items.map(i => ({ ...i, purchase: purchase._id }));
            await PurchaseItem.insertMany(purchaseItems);
        }
        const result = await Purchase.findById(purchase._id);
        return successRes(res, result, 201);
    });

    findAll = catchAsync(async (req, res) => {
        const purchases = await Purchase.find();
        return successRes(res, purchases);
    });

    findOne = catchAsync(async (req, res) => {
        const id = req.params.id;
        const purchase = await Purchase.findById(id);
        if (!purchase) throw new ApiError("Purchase not found", 404);
        return successRes(res, purchase);
    });

    update = catchAsync(async (req, res) => {
        const id = req.params.id;
        const purchase = await Purchase.findById(id);
        if (!purchase) throw new ApiError("Purchase not found", 404);
        if (purchase.is_locked) throw new ApiError("Purchase is locked", 403);
        const { items, ...updateData } = req.body;
        Object.assign(purchase, updateData);
        await purchase.save();
        if (items && items.length) {
            await PurchaseItem.deleteMany({ purchase: purchase._id });
            const purchaseItems = items.map(i => ({ ...i, purchase: purchase._id }));
            await PurchaseItem.insertMany(purchaseItems);
        }
        const result = await Purchase.findById(purchase._id);
        return successRes(res, result);
    });

    remove = catchAsync(async (req, res) => {
        const id = req.params.id;
        const purchase = await Purchase.findById(id);
        if (!purchase) throw new ApiError("Purchase not found", 404);
        if (purchase.is_locked) throw new ApiError("Purchase is locked", 403);
        await PurchaseItem.deleteMany({ purchase: purchase._id });
        await purchase.deleteOne();
        return successRes(res, {});
    });
}

export default new PurchaseController();