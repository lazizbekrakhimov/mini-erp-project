import { model, Schema } from "mongoose";
import { generateSKU } from "../utils/sku.js";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sku: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

productSchema.pre('save', function () {
    if (!this.sku) {
        this.sku = generateSKU(this._id);
    }
});

export default model("Product", productSchema);