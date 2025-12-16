import { Schema, model } from "mongoose";
import { Roles } from "../enums/const-roles.js";

const userSchema = new Schema({
    fullname: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    role: {
        type: String, enum: [
            Roles.SUPERADMIN,
            Roles.ADMIN,
            Roles.MANAGER,
            Roles.ACCOUNTANT,
            Roles.SALES,
            Roles.WAREHOUSE
        ], required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('User', userSchema)