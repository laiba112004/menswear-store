const Order = require('../models/Order');


exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, guestEmail, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in order payload' });
    }

    const trackingCode = `ATL-${Math.floor(1000 + Math.random() * 9000)}-2026`;

    const order = new Order({
      guestEmail,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod: 'Credit Card (Stripe Gateway)',
      paymentResult: { id: trackingCode, status: 'Success' },
      orderStatus: 'Processing'
    });

    const createdOrder = await order.save();
    res.status(201).json({
      success: true,
      orderId: createdOrder._id,
      trackingCode: trackingCode,
      order: createdOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.trackOrder = async (req, res) => {
  try {
    const { reference } = req.params;

    let order = await Order.findOne({ 'paymentResult.id': reference });
    if (!order && reference.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(reference);
    }

    if (!order) {
      return res.status(404).json({ message: 'No dispatch found with this reference code' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};