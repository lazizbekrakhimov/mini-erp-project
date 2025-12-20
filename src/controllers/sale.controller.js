import Sale from "../schemas/sale.schema.js";
import { BaseController } from "./base.controller.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";

export class SaleController extends BaseController {
    constructor() {
        super(Sale, "customer_id");
    }

    create = this._wrap(async (req, res) => {
        const { customer_id, created_by, total_amount, paid_amount, due_amount, status, is_locked = false } = req.body;

        const sale = await Sale.create({
            customer_id,
            created_by,
            total_amount,
            paid_amount,
            due_amount,
            status,
            is_locked
        });

        return successRes(res, sale, 201);
    });

    update = this._wrap(async (req, res) => {
        const sale = await this._getById(req.params.id);

        if (sale.is_locked) throw new ApiError("Cannot update locked sale", 403);

        if (req.body.paid_amount !== undefined) {
            req.body.due_amount = (req.body.total_amount || sale.total_amount) - req.body.paid_amount;
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