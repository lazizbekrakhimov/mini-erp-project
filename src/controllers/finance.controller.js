import { catchAsync } from "../middlewares/catch-async.js";
import FinancialLog from "../schemas/financial-log.schema.js";
import { successRes } from "../utils/success-response.js";

class FinanceController {
    findAll = catchAsync(async (req, res) => {
        const logs = await FinancialLog.find()
            .populate("created_by")
            .sort({ createdAt: -1 });

        return successRes(res, logs);
    });

    summary = catchAsync(async (req, res) => {
        const summary = await FinancialLog.aggregate([
            {
                $group: {
                    _id: "$direction",
                    total: { $sum: "$amount" }
                }
            }
        ]);
        return successRes(res, summary);
    });
}

export default new FinanceController();