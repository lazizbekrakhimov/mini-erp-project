import { model, Schema } from "mongoose";
import { generateSKU } from "../utils/sku.js";

const productSchema = new Schema({
    name: { type: String, required: true },
    sku: { type: String, unique: true },
    sale_price: { type: Number, required: true },
    cost_price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    is_active: { type: Boolean, default: true },
    deleted_at: { type: Date, default: null },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.pre('save', function () {
    if (!this.sku) {
        this.sku = generateSKU(this._id);
    }
});

export default model("Product", productSchema);