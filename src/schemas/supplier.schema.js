import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, {
    timestamps: { 
        createdAt: "created_at",
        updatedAt: false 
    },
    versionKey: false
});

export default model("Supplier", supplierSchema);