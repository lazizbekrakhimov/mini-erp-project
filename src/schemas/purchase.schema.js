import { model, Schema } from "mongoose";

const purchaseSchema = new Schema({
    supplier: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
    total_amount: { type: Number, required: true },
    is_locked: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

purchaseSchema.virtual("items", {
    ref: "PurchaseItem",
    localField: "_id",
    foreignField: "purchase"
});

export default model("Purchase", purchaseSchema);