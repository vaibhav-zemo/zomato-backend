const Review = require("../models/reviewModel");

// Create a new review
const create = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing review
const update = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a review
const remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Show a specific review
const show = async (req, res) => {
  try {
    let review;
    console.log(req.query)
    if(req.query.userId){
        review = await Review.find({userId: req.query.userId}).populate("userId");
    } 
    else if(req.query.reviewId){
        review = await Review.findById(req.query.reviewId).populate("userId");
    }
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, update, remove, show };
