const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.show);
router.get('/', userController.list);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);

module.exports = router;
