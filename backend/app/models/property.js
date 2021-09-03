const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facilities: {
        type: []
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    star: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booking: {
        type: []
    },
    city: {
        type: String
    },
    guests: {
        type: Number
    },
    freeCancellation: {
        type: Boolean
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);