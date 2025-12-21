import { model, Schema } from "mongoose";
import { PartnerStatus } from "../enums/partner-status.js";
import { PartnerType } from "../enums/partner-type.js";

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
    type: {
        type: String,
        enum: Object.values(PartnerType),
        required: true },
    status: {
        type: String,
        enum: Object.values(PartnerStatus),
        default: PartnerStatus.ACTIVE
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    versionKey: false
});

export default model('Partner', customerSchema);