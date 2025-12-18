import { BaseController } from "./base.controller.js";
import Supplier from "../schemas/supplier.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";

class SupplierController extends BaseController {
    constructor() {
        super(Supplier);
    }

    create = catchAsync(async (req, res) => {
    const { phone } = req.body;
    await this._isExist({ phone }, "Supplier with this phone");
    const data = await this.model.create(req.body);
    return successRes(res, data, 201);
});
}

export default new SupplierController();