const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
  bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill'},
  couponCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
});

module.exports = mongoose.model("Cart", cartSchema);
