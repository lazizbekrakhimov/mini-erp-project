import { Schema, model, Types } from "mongoose";

const saleItemSchema = new Schema({
    sale_id: { type: Types.ObjectId, ref: "Sale", required: true },
    product_id: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
    versionKey: false
});

export default model("SaleItem", saleItemSchema);