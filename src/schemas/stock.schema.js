import { model, Schema } from "mongoose";

const stockSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    warehouse: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: false,
    versionKey: false
}
);

export default model("Stock", stockSchema);