const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Otp', otpSchema);