import Joi from "joi";
import { PaymentStatus } from "../enums/payment-status.js";

class SaleValidator {
  create(data) {
    const schema = Joi.object({
      customer: Joi.string().required(),
      created_by: Joi.string().required(),
      invoice_number: Joi.string().optional(),
      total_amount: Joi.number().min(0).required(),
      paid_amount: Joi.number().min(0).optional(),
      status: Joi.string()
        .valid(...Object.values(PaymentStatus))
        .optional(),
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
      customer: Joi.string().optional(),
      paid_amount: Joi.number().min(0).optional(),
      total_amount: Joi.number().min(0).optional(),
      status: Joi.string()
        .valid(...Object.values(PaymentStatus))
        .optional(),
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

export default new SaleValidator();