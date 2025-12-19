import Joi from "joi";
import { CUSTOMER_STATUS } from "../enums/customer-status.js";

class CustomerValidator {
    create(data) {
        const customer = Joi.object({
            first_name: Joi.string().min(2).max(50).required(),
            last_name: Joi.string().min(2).max(50).optional(),
            phoneNumber: Joi.string().min(7).max(20).required(),
            email: Joi.string().email().lowercase().optional(),
            status: Joi.string()
                .valid(...Object.values(CUSTOMER_STATUS))
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
            status: Joi.string()
                .valid(...Object.values(CUSTOMER_STATUS))
                .optional()
        });

        return customer.validate(data);
    }
}

export default new CustomerValidator();