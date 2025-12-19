import { model, Schema } from "mongoose";
import { CUSTOMER_STATUS } from "../enums/customer-status.js";

const customerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: Object.values(CUSTOMER_STATUS),
        default: CUSTOMER_STATUS.ACTIVE
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    versionKey: false
});

export default model('Customer', customerSchema);