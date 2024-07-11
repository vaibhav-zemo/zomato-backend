const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    percentageDiscount: {
        type: Number,
    },
    minimumOrderValue: {
        type: Number,
        required: true
    },
    maximumDiscount: {
        type: Number,
        required: true
    },
    flatDiscount: {
        type: Number,
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'flat']
    },
    expiry: {
        type: Date,
        required: true
    },
    
}, {timestamps: true});

module.exports = mongoose.model('Coupon', couponSchema);