const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/', restaurantController.create);
router.get('/', restaurantController.show);

module.exports = router;