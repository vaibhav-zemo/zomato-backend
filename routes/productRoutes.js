const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single("image"), productController.create);
router.put('/:productId', upload.single("image"), productController.update);
router.delete('/:productId', productController.remove);
router.get('/', productController.list);
router.get('/:productId', productController.show);

module.exports = router;