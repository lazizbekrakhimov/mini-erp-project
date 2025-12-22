import { BaseController } from "./base.controller.js";
import { catchAsync } from "../middlewares/catch-async.js";
import Purchase from "../schemas/purchase.schema.js";
import PurchaseItem from "../schemas/purchase-item.schema.js";
import { ApiError } from "../utils/custom-error.js";

class PurchaseController extends BaseController {
    constructor() {
        super(Purchase);
    }

    create = catchAsync(async (req, res) => {
        const { items, ...purchaseData } = req.body;
        const purchase = await this.model.create(purchaseData);
        if (items?.length) {
            await this._syncItems(purchase._id, items);
        }
        const result = await this.model.findById(purchase._id);
        return this._success(res, result, 201);
    });

    update = catchAsync(async (req, res) => {
        const id = req.params.id;
        const purchase = await this._getUnlockedPurchase(id);
        const { items, ...updateData } = req.body;
        Object.assign(purchase, updateData);
        await purchase.save();
        if (items) {
            await this._syncItems(purchase._id, items, true);
        }
        const result = await this.model.findById(purchase._id);
        return this._success(res, result);
    });

    remove = catchAsync(async (req, res) => {
        const id = req.params.id;
        const purchase = await this._getUnlockedPurchase(id);
        await PurchaseItem.deleteMany({ purchase: purchase._id });
        await purchase.deleteOne();
        return this._success(res, {});
    });

    async _getUnlockedPurchase(id) {
        const purchase = await this._getById(id);
        if (purchase.is_locked) {
            throw new ApiError("Purchase is locked", 403);
        }
        return purchase;
    }

    async _syncItems(purchaseId, items, replace = false) {
        if (replace) {
            await PurchaseItem.deleteMany({ purchase: purchaseId });
        }
        const purchaseItems = items.map(i => ({
            ...i,
            purchase: purchaseId
        }));
        await PurchaseItem.insertMany(purchaseItems);
    }

    lock = this._wrap(async (req, res) => {
        const sale = await this.model.findOneAndUpdate(
            { _id: req.params.id },
            { is_locked: true },
            { new: true }
        );
        if (!sale) {
            throw new ApiError("Purchase not found", 404);
        }
        return this._success(res, sale);
    });

    unlock = this._wrap(async (req, res) => {
        const sale = await this.model.findOneAndUpdate(
            { _id: req.params.id },
            { is_locked: false },
            { new: true }
        );
        if (!sale) {
            throw new ApiError("Purchase not found", 404);
        }
        return this._success(res, sale);
    });
    
}

export default new PurchaseController();