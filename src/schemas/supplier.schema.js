import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
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