const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    isPureVeg: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    image: {
        type: String,
    },
    license: {
        type: String,
        required: true
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, {timestamps: true})

module.exports = mongoose.model('Restaurant', restaurantSchema)