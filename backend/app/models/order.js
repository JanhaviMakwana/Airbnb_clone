const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyId: {
        type: String,
        ref: 'Property',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    nights: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);