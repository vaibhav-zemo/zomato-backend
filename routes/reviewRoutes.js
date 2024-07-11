const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.create);

// Update an existing review
router.put('/:id', reviewController.update);

// Delete a review
router.delete('/:id', reviewController.remove);

// Show a specific review
router.get('/', reviewController.show);

module.exports = router;
