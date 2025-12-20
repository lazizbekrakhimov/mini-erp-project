import Joi from "joi";
import { Types } from "mongoose";

class SaleValidator {
  objectId = (value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }

  // Sale yaratish validator
  create = (data) => {
    const schema = Joi.object({
      customer_id: Joi.string().custom(this.objectId, "ObjectId Validation").required(),
      created_by: Joi.string().custom(this.objectId, "ObjectId Validation").required(),
      total_amount: Joi.number().precision(2).min(0).required(),
      paid_amount: Joi.number().precision(2).min(0).required(),
      due_amount: Joi.number().precision(2).min(0).required(),
      status: Joi.string().valid("UNPAID", "PARTIAL", "PAID", "CANCELLED").required(),
      is_locked: Joi.boolean().optional().default(false)
    });
    return schema.validate(data);
  }

  update = (data) => {
    const schema = Joi.object({
      total_amount: Joi.number().precision(2).min(0).optional(),
      paid_amount: Joi.number().precision(2).min(0).optional(),
      due_amount: Joi.number().precision(2).min(0).optional(),
      status: Joi.string().valid("UNPAID", "PARTIAL", "PAID", "CANCELLED").optional(),
      is_locked: Joi.boolean().optional()
    });
    return schema.validate(data);
  }
}

export default new SaleValidator();