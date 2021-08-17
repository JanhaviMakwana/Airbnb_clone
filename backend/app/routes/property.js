const express = require('express');
const router = express.Router();

const { addProperty, getProperties, getFullProperty } = require('../controllers/property');

router.post('/add-property', addProperty);
router.get('/get-property/:propertyId', getFullProperty);
router.get('/get-properties',getProperties );

module.exports = router;