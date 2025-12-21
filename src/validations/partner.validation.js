import Joi from "joi";
import { PartnerStatus } from "../enums/partner-status.js";
import { PartnerType } from "../enums/partner-type.js";

class CustomerValidator {
    create(data) {
        const customer = Joi.object({
            first_name: Joi.string().min(2).max(50).required(),
            last_name: Joi.string().min(2).max(50).optional(),
            phoneNumber: Joi.string().min(7).max(20).required(),
            email: Joi.string().email().lowercase().optional(),
            type: Joi.string()
                .valid(...Object.values(PartnerType))
                .required(),
            status: Joi.string()
                .valid(...Object.values(PartnerStatus))
                .optional()
        });

        return customer.validate(data);
    }

    update(data) {
        const customer = Joi.object({
            first_name: Joi.string().min(2).max(50).optional(),
            last_name: Joi.string().min(2).max(50).optional(),
            phoneNumber: Joi.string().min(7).max(20).optional(),
            email: Joi.string().email().lowercase().optional(),
            type: Joi.string()
                .valid(...Object.values(PartnerType))
                .required(),
            status: Joi.string()
                .valid(...Object.values(PartnerStatus))
                .optional()
        });

        return customer.validate(data);
    }
}

export default new CustomerValidator();