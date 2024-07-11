const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: [{
      type: String,
      enum: ["admin", "customer", "merchant", "deliveryPartner"],
      default: "customer",
      required: true,
    }]
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
