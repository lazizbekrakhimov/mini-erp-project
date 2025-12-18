import Joi from "joi";

class SupplierValidator {
    create(data) {
        const supplier = Joi.object({
            fullName: Joi.string().required(),
            phoneNumber: Joi.string().required()
        });
        return supplier.validate(data);
    }

    update(data) {
        const supplier = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().optional()
        }).min(1);
        return supplier.validate(data);
    }
}

export default new SupplierValidator();