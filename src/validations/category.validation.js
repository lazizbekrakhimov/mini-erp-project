import Joi from "joi";

class CategoryValidator {
    create(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().optional(),
            parent_id: Joi.string().optional().allow(null)
        });
        return schema.validate(data);
    }

    update(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).optional(),
            description: Joi.string().optional(),
            parent_id: Joi.string().optional().allow(null)
        });
        return schema.validate(data);
    }
}

export default new CategoryValidator();