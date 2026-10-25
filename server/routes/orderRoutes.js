const express = require('express');
const router = express.Router();
const { createOrder, trackOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.route('/')
  .post(createOrder)
  .get(getAllOrders);

router.route('/track/:reference')
  .get(trackOrder);

router.route('/:id/status')
  .put(updateOrderStatus);

module.exports = router;