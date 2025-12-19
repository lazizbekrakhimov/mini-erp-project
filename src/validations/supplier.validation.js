import Joi from "joi";

class SupplierValidator {
    create(data) {
        const supplier = Joi.object({
            fullName: Joi.string().min(2).max(50).required(),
            phoneNumber: Joi.string().min(7).max(20).required()
        });
        return supplier.validate(data);
    }

    update(data) {
        const supplier = Joi.object({
            fullName: Joi.string().min(2).max(50).optional(),
            phoneNumber: Joi.string().min(7).max(20).optional()
        }).min(1);
        return supplier.validate(data);
    }
}

export default new SupplierValidator();