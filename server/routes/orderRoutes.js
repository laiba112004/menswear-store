const express = require('express');
const router = express.Router();
const { createOrder, trackOrder, getAllOrders } = require('../controllers/orderController');

router.route('/')
  .post(createOrder)
  .get(getAllOrders);

router.route('/track/:reference')
  .get(trackOrder);

module.exports = router;