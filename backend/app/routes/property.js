const express = require('express');
const router = express.Router();

const { addProperty, getProperties, getFullProperty, search } = require('../controllers/property');

router.post('/add-property', addProperty);
router.post('/search', search);
router.get('/get-property/:propertyId', getFullProperty);
router.get('/get-properties',getProperties );

module.exports = router;