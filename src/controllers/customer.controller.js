import { BaseController } from "./base.controller.js";
import Customer from "../schemas/customer.schema.js";
import CustomerValidator from "../validations/customer.validation.js";
import { CUSTOMER_STATUS } from "../enums/customer-status.js";
import { ApiError } from "../utils/custom-error.js";

class CustomerController extends BaseController {
    constructor() {
        super(Customer, null);
    }

    create = this._wrap(async (req, res) => {
        const { error } = CustomerValidator.create(req.body);
        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }
        await this._isExist(
            {
                phone: req.body.phone,
                status: { $ne: CUSTOMER_STATUS.DELETED },
            },
            "Customer"
        );
        const data = await this.model.create(req.body);
        return this._success(res, data, 201);
    });

    findAll = this._wrap(async (_req, res) => {
        const data = await this.model.find({
            status: { $ne: CUSTOMER_STATUS.DELETED },
        });
        return this._success(res, data);
    });

    findOne = this._wrap(async (req, res) => {
        const customer = await this.model.findOne({
            _id: req.params.id,
            status: { $ne: CUSTOMER_STATUS.DELETED },
        });
        if (!customer) {
            throw new ApiError("Customer not found", 404);
        }
        return this._success(res, customer);
    });

    update = this._wrap(async (req, res) => {
        const { error } = CustomerValidator.update(req.body);
        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }
        const customer = await this.model.findOneAndUpdate(
            {
                _id: req.params.id,
                status: { $ne: CUSTOMER_STATUS.DELETED },
            },
            req.body,
            { new: true }
        );
        if (!customer) {
            throw new ApiError("Customer not found", 404);
        }
        return this._success(res, customer);
    });

    remove = this._wrap(async (req, res) => {
        const customer = await this.model.findOneAndUpdate(
            { _id: req.params.id },
            { status: CUSTOMER_STATUS.DELETED },
            { new: true }
        );
        if (!customer) {
            throw new ApiError("Customer not found", 404);
        }
        return this._success(res, {});
    });

    // BLOCK CUSTOMER: bu customerlarni block qilish uchun ishlatiladi
    block = this._wrap(async (req, res) => {
        const customer = await this.model.findOneAndUpdate(
            {
            _id: req.params.id,
            status: { $ne: CUSTOMER_STATUS.DELETED },
            },
            { status: CUSTOMER_STATUS.BLOCKED },
            { new: true }
        );
        if (!customer) {
            throw new ApiError("Customer not found", 404);
        }
        return this._success(res, customer);
    });

    // ACTIVATE CUSTOMER: ya'ni block bo'lganlarni active qilish uchun ishlatiladi
    activate = this._wrap(async (req, res) => {
        const customer = await this.model.findOneAndUpdate(
            { _id: req.params.id },
            { status: CUSTOMER_STATUS.ACTIVE },
            { new: true }
        );
        if (!customer) {
            throw new ApiError("Customer not found", 404);
        }
        return this._success(res, customer);
    });
}

export default new CustomerController();
