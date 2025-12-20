import Joi from "joi";
import { Types } from "mongoose";

class SaleValidator {
  objectId = (value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }

  // Sale
  create = (data) => {
    const schema = Joi.object({
      customer_id: Joi.string().custom(this.objectId, "ObjectId Validation").required(),
      items: Joi.array().items(
        Joi.object({
          product_id: Joi.string().custom(this.objectId, "ObjectId Validation").required(),
          quantity: Joi.number().integer().min(1).required(),
          price: Joi.number().precision(2).min(0).required(),
        })
      ).min(1).required(),
      paid_amount: Joi.number().precision(2).min(0).default(0),
    });
    return schema.validate(data);
  }

  update = (data) => {
    const schema = Joi.object({
      status: Joi.string().valid("UNPAID", "PARTIAL", "PAID", "CANCELLED").optional(),
      paid_amount: Joi.number().precision(2).min(0).optional(),
    });
    return schema.validate(data);
  }

  // SaleItem
  createItem = (data) => {
    const schema = Joi.object({
      sale_id: Joi.string().custom(this.objectId, "ObjectId Validation").required(),
      product_id: Joi.string().custom(this.objectId, "ObjectId Validation").required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().precision(2).min(0).required(),
    });
    return schema.validate(data);
  }

  updateItem = (data) => {
    const schema = Joi.object({
      quantity: Joi.number().integer().min(1).optional(),
      price: Joi.number().precision(2).min(0).optional(),
    });
    return schema.validate(data);
  }
}

export default new SaleValidator();