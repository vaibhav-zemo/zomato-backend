const express = require('express');
const router = express.Router();

const cityController = require('../controllers/cityController');

router.get('/', cityController.list);
router.get('/:id', cityController.show);
router.post('/', cityController.create);
router.put('/:id', cityController.update);
router.delete('/:id', cityController.remove);

module.exports = router;