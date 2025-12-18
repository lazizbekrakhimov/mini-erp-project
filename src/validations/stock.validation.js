import Joi from "joi";

class StockValidator{
    create(data){
        const stock = Joi.object({
            product_id: Joi.string().required(),
            quantity: Joi.number().integer().min(0).required(),
            warehouse: Joi.string().optional()
        })
        return stock.validate(data)
    }

    update(data){
        const stock = Joi.object({
            quantity: Joi.number().integer().min(0).optional(),
            warehouse: Joi.string().optional()
        })
        return stock.validate(data)
    }
}

export default new StockValidator()