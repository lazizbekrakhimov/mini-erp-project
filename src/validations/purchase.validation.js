import Joi from "joi";

class PurchaseValidator {
    create(data) {
        const schema = Joi.object({
            supplier: Joi.string().required(),
            created_by: Joi.string().required(),
            total_amount: Joi.number().min(0).required(),
            items: Joi.array()
                .items(
                    Joi.object({
                        product: Joi.string().required(),
                        quantity: Joi.number().min(1).required(),
                        price: Joi.number().min(0).required()
                    })
                )
                .min(1)
                .required()
        });
        return schema.validate(data, { abortEarly: false });
    }

    update(data) {
        const schema = Joi.object({
            supplier: Joi.string().optional(),
            total_amount: Joi.number().min(0).optional(),
            items: Joi.array()
                .items(
                    Joi.object({
                        product: Joi.string().required(),
                        quantity: Joi.number().min(1).required(),
                        price: Joi.number().min(0).required()
                    })
                )
                .optional()
        });
        return schema.validate(data, { abortEarly: false });
    }
}

export default new PurchaseValidator();