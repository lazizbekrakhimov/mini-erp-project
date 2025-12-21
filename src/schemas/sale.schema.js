import { model, Schema } from "mongoose";
import { PaymentStatus } from "../enums/payment-status.js";
import { generateInvoiceNumber } from "../utils/invoice-generator.js";

const saleSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
    invoice_number: { type: String, unique: true },
    total_amount: { type: Number, required: true },
    paid_amount: { type: Number, default: 0 },
    due_amount: { type: Number, default: function() { return this.total_amount; } },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.UNPAID
    },
    is_locked: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

saleSchema.virtual("items", {
    ref: "SaleItem",
    localField: "_id",
    foreignField: "sale"
});

saleSchema.pre('save', async function() {
    if (!this.invoice_number) {
        const count = await this.constructor.countDocuments({
            createdAt: {
                $gte: new Date(new Date().setHours(0,0,0,0)),
                $lte: new Date(new Date().setHours(23,59,59,999))
            }
        });
        this.invoice_number = generateInvoiceNumber(new Date(), count + 1);
    }

    this.due_amount = this.total_amount - this.paid_amount;
    if (this.paid_amount === 0) this.status = PaymentStatus.UNPAID;
    else if (this.paid_amount < this.total_amount) this.status = PaymentStatus.PARTIAL;
    else this.status = PaymentStatus.PAID;
});

export default model("Sale", saleSchema);