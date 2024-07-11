const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    itemTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    platformFee: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Bill', billSchema);