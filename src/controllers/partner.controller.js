import { BaseController } from "./base.controller.js";
import Partner from "../schemas/partner.schema.js";
import partnerValidator from "../validations/partner.validation.js";
import { PartnerStatus } from "../enums/partner-status.js";
import { ApiError } from "../utils/custom-error.js";

class PartnerController extends BaseController {
    constructor() {
        super(Partner, null);
    }

    create = this._wrap(async (req, res) => {
        console.log(req)
        const { error } = partnerValidator.create(req.body);
        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }
        await this._isExist(
            {
                phoneNumber: req.body.phoneNumber,
                status: { $ne: PartnerStatus.DELETED },
            },
            "Partner"
        );
        const data = await this.model.create(req.body);
        return this._success(res, data, 201);
    });

    findAll = this._wrap(async (_req, res) => {
        const data = await this.model.find({
        });
        return this._success(res, data);
    });

    findOne = this._wrap(async (req, res) => {
        const partner = await this.model.findOne({
            _id: req.params.id,
        });
        if (!partner) {
            throw new ApiError("Partner not found", 404);
        }
        return this._success(res, partner);
    });

    update = this._wrap(async (req, res) => {
        const { error } = partnerValidator.update(req.body);
        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }
        const partner = await this.model.findOneAndUpdate(
            {
                _id: req.params.id,
                status: { $ne: PartnerStatus.DELETED },
            },
            req.body,
            { new: true }
        );
        if (!partner) {
            throw new ApiError("partner not found", 404);
        }
        return this._success(res, partner);
    });
    // DELETE PARTNER (faqat status uchun)
    remove = this._wrap(async (req, res) => {
        const partner = await this.model.findOneAndUpdate(
            { _id: req.params.id },
            { status: PartnerStatus.DELETED },
            { new: true }
        );
        if (!partner) {
            throw new ApiError("partner not found", 404);
        }
        return this._success(res, partner);
    });
    // BLOCK PARTNER: bu partnerlarni block qilish uchun ishlatiladi
    block = this._wrap(async (req, res) => {
        const partner = await this.model.findOneAndUpdate(
            {
                _id: req.params.id,
                status: { $ne: PartnerStatus.DELETED },
            },
            { status: PartnerStatus.BLOCKED },
            { new: true }
        );
        if (!partner) {
            throw new ApiError("Partner not found", 404);
        }
        return this._success(res, partner);
    });
    // ACTIVATE PARTNER: ya'ni block bo'lganlarni active qilish uchun ishlatiladi
    activate = this._wrap(async (req, res) => {
        const partner = await this.model.findOneAndUpdate(
            { _id: req.params.id },
            { status: PartnerStatus.ACTIVE },
            { new: true }
        );
        if (!partner) {
            throw new ApiError("Partner not found", 404);
        }
        return this._success(res, partner);
    });
    // INACTIVATE PARTNER: faol bo'lmagan partnerlarni inactive qilish uchun ishlatiladi
    inactivate = this._wrap(async (req, res) => {
        const partner = await this.model.findOneAndUpdate(
            {
                _id: req.params.id,
                status: { $ne: PartnerStatus.DELETED },
            },
            { status: PartnerStatus.INACTIVE },
            { new: true }
        );
        if (!partner) {
            throw new ApiError("Partner not found", 404);
        }
        return this._success(res, partner);
    });
}

export default new PartnerController();