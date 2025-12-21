import Joi from "joi";
import { PaymentType } from "../enums/payment-type.js";

class PaymentValidator {
    create(data) {
        const schema = Joi.object({
            sale: Joi.string().required(),
            amount: Joi.number().min(1).required(),
            payment_method: Joi.string()
                .valid(...Object.values(PaymentType))
                .required(),
            created_by: Joi.string().required()
        });

        return schema.validate(data, { abortEarly: false });
    }
}

export default new PaymentValidator();