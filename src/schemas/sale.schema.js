import { Schema, model, Types } from "mongoose";
import { PaymentStatus } from "../enums/payment-status.js";

const saleSchema = new Schema({
    customer_id: { type: Types.ObjectId, ref: "Customer", required: true },
    created_by: { type: Types.ObjectId, ref: "User", required: true },
    total_amount: { type: Number, required: true, default: 0 },
    paid_amount: { type: Number, required: true, default: 0 },
    due_amount: { type: Number, required: true, default: 0 },
    status: {
        type: String, enum: [
            PaymentStatus.UNPAID,
            PaymentStatus.PARTIAL,
            PaymentStatus.PAID,
            PaymentStatus.CANCELLED
        ], default: "UNPAID"
    },
    is_locked: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
},{
    versionKey: false
});

export default model("Sale", saleSchema);