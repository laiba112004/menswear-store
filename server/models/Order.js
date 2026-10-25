const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  guestEmail: { type: String, required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      title: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true }
    }
  ],
  shippingAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String }
  },
  paymentMethod: { type: String, default: 'Pending' },
  paymentResult: { id: String, status: String },
  totalPrice: { type: Number, required: true },
  orderStatus: { 
    type: String, 
    default: 'Processing', 
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);