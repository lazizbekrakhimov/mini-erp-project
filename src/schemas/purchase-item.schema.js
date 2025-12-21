import { model, Schema } from "mongoose";

const purchaseItemSchema = new Schema({
    purchase: { type: Schema.Types.ObjectId, ref: "Purchase", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export default model("PurchaseItem", purchaseItemSchema);