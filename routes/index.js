const express = require("express");
const router = express.Router();
const cityRouter = require("./cityRoutes");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const addressRouter = require("./addressRoutes");
const categoryRouter = require("./categoryRoutes");
const reviewRouter = require("./reviewRoutes");
const restaurantRouter = require("./restaurantRoutes");
const couponRoutes = require("./couponRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/city", cityRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/address", addressRouter);
router.use("/category", categoryRouter);
router.use("/review", reviewRouter);
router.use("/restaurant", restaurantRouter);
router.use("/coupon", couponRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

module.exports = router;
