import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.virtual('subCategories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent_id'
})

export default model('Category', categorySchema);