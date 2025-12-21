import Joi from "joi";

class ProductValidator {
    create(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            sku: Joi.string().min(3).optional(),
            sale_price: Joi.number().required(),
            cost_price: Joi.number().required(),
            category: Joi.string().required(),
            is_active: Joi.boolean().optional()
        });
        return schema.validate(data);
    }

    update(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).optional(),
            sku: Joi.string().min(3).optional(),
            sale_price: Joi.number().optional(),
            cost_price: Joi.number().optional(),
            category: Joi.string().optional(),
            is_active: Joi.boolean().optional()
        });
        return schema.validate(data);
    }
}

export default new ProductValidator();