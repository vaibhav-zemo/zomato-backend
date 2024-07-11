const Address = require("../models/addressModel");
const Customer= require("../models/customerModel");

// Create a new address
const create = async (req, res) => {
  try {
    const customer = await Customer.findOne({userId: req.params.userId});
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newAddress = new Address(req.body);
    await newAddress.save();
    
    customer.address.push(newAddress._id);
    await customer.save();
    
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing address
const update = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an address
const remove = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const show = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, update, remove, show };
