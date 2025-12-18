import Joi from "joi";

class SupplierValidator {
    create(data) {
        const supplier = Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().required()
        });
        return supplier.validate(data);
    }

    update(data) {
        const supplier = Joi.object({
            name: Joi.string().optional(),
            phone: Joi.string().optional()
        }).min(1);
        return supplier.validate(data);
    }
}

export default new SupplierValidator();