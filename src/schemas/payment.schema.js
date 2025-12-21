import { model, Schema } from "mongoose";
import { PaymentType } from "../enums/payment-type.js";

const paymentSchema = new Schema({
  sale: { type: Schema.Types.ObjectId, ref: "Sale", required: true },
  amount: { type: Number, required: true },
  payment_method: {
    type: String,
    enum: Object.values(PaymentType),
    required: true
  },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true,
  versionKey: false
});

export default model("Payment", paymentSchema);