import { model, Schema } from "mongoose";
import { FinancialDirection } from "../enums/financial-direction.js";

const financialLogSchema = new Schema({
    type: {
        type: String,
        enum: ["sale", "purchase", "payment"],
        required: true
    },
    reference_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    amount: { type: Number, required: true },
    direction: {
        type: String,
        enum: Object.values(FinancialDirection),
        required: true
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true,
    versionKey: false
});

export default model("FinancialLog", financialLogSchema);