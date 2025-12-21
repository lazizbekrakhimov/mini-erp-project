import { BaseController } from "./base.controller.js";
import { catchAsync } from "../middlewares/catch-async.js";
import Payment from "../schemas/payment.schema.js";
import Sale from "../schemas/sale.schema.js";
import FinancialLog from "../schemas/financial-log.schema.js";
import { FinancialDirection } from "../enums/financial-direction.js";
import { successRes } from "../utils/success-response.js";
import { ApiError } from "../utils/custom-error.js";

export class PaymentController extends BaseController {
    create = catchAsync(async (req, res) => {
        const { sale: saleId, amount, created_by } = req.body;
        const sale = await Sale.findById(saleId);
        if (!sale) throw new ApiError("Sale not found", 404);
        if (sale.is_locked) throw new ApiError("Sale is locked", 403);
        const payment = await Payment.create(req.body);
        sale.paid_amount += amount;
        await sale.save();
        await FinancialLog.create({
            type: "payment",
            reference_id: payment._id,
            amount,
            direction: FinancialDirection.IN,
            created_by
        });
        return successRes(res, payment, 201);
    });
}

export default new PaymentController(Payment, "sale");