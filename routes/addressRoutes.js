const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

// Create a new address
router.post("/:userId", addressController.create);

// Update an existing address
router.put("/:id", addressController.update);

// Delete an address
router.delete("/:id", addressController.remove);

// Show an address
router.get("/:id", addressController.show);

module.exports = router;
