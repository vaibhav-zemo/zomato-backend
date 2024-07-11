const mongoose = require('mongoose');

const deliveryPartnerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    salary: {
        type: Number,
        required: true,
        default: 0
    }
})