const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");

// Create a new coupon
router.post("/", couponController.create);

// Get all coupons
router.get("/", couponController.list);

// Get a single coupon by ID
router.get("/:id", couponController.show);

// Update a coupon by ID
router.put("/:id", couponController.update);

// Delete a coupon by ID
router.delete("/:id", couponController.remove);

module.exports = router;
