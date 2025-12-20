import Sale from "../schemas/sale.schema.js";
import SaleItem from "../schemas/sale-item.schema.js";
import { BaseController } from "./base.controller.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";

export class SaleController extends BaseController {
    constructor() {
        super(Sale, "customer_id");

        // SaleItem uchun alohida BaseController
        this.saleItemController = new BaseController(SaleItem, "product_id");
    }

    create = this._wrap(async (req, res) => {
        const { sale_id, customer_id, items, paid_amount = 0 } = req.body;
        let sale;
        if (sale_id) {
            sale = await Sale.findById(sale_id);
            if (!sale) throw new ApiError("Sale not found", 404);
        } else {
            const total_amount = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
            const due_amount = total_amount - paid_amount;

            sale = await Sale.create({
                customer_id,
                created_by: req.user.id,
                total_amount,
                paid_amount,
                due_amount,
                status: paid_amount === 0 ? "UNPAID" : (due_amount === 0 ? "PAID" : "PARTIAL"),
            });
        }
        const saleItems = [];
        for (let i of items) {
            const existingItem = await SaleItem.findOne({ sale_id: sale._id, product_id: i.product_id });
            if (existingItem) {
                existingItem.quantity = i.quantity;
                existingItem.price = i.price;
                await existingItem.save();
                saleItems.push(existingItem);
            } else {
                const newItem = await SaleItem.create({ ...i, sale_id: sale._id });
                saleItems.push(newItem);
            }
        }
        return successRes(res, { sale, items: saleItems }, 201);
    });

    update = this._wrap(async (req, res) => {
        const sale = await this._getById(req.params.id);

        if (sale.is_locked) throw new ApiError("Cannot update locked sale", 403);

        if (req.body.paid_amount !== undefined) {
            req.body.due_amount = sale.total_amount - req.body.paid_amount;
            req.body.status = req.body.paid_amount === 0
                ? "UNPAID"
                : req.body.due_amount === 0
                    ? "PAID"
                    : "PARTIAL";
        }

        const updatedData = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return successRes(res, updatedData);
    });
}

export default new SaleController();