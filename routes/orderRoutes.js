const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/:userId', orderController.create);
router.get('/list/:userId', orderController.list);
router.get('/:orderId', orderController.show);
router.put('/:orderId', orderController.update);

module.exports = router;