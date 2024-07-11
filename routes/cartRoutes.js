const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.create);
router.get('/:userId', cartController.show);
router.put('/add/:cartId', cartController.addProduct);
router.put('/remove/:cartId/:cartItemId', cartController.removeProduct);
router.put('/add/coupon/:cartId/:couponId', cartController.addCoupon);
router.put('/remove/coupon/:cartId/:couponId', cartController.removeCoupon);

module.exports = router;