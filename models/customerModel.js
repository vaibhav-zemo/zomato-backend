const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    address: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }],
    isPremium: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    dob:{
      type: Date,
    },
    gender:{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
