const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    category: {
      type: String,
      required: true,
      enum: ['T-Shirts', 'Hoodies', 'Crewnecks', 'Pants', 'Shorts', 'Hats', 'Accessories']
    },
    gender: { type: String, enum: ['Men', 'Women', 'Unisex'], default: 'Men' },
    images: [{ type: String, required: true }],
    variants: [
      {
        color: { type: String, required: true },
        colorCode: { type: String },
        size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String }
      }
    ],
    isNewArrival: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);