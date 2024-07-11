const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
}, {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);