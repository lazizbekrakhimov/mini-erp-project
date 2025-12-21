import { model, Schema } from "mongoose";

const saleItemSchema = new Schema({
    sale: { type: Schema.Types.ObjectId, ref: "Sale", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
}, {
    timestamps: true,
    versionKey: false
})

export default model("SaleItem", saleItemSchema);