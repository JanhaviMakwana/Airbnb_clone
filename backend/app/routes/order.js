const express = require('express');
const router = express.Router();

const {orderPlace, getOrders} = require('../controllers/order');

router.post('/order-place/:propertyId', orderPlace);
router.get('/orders', getOrders);

module.exports = router;