const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    houseNumber: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Address', addressSchema);