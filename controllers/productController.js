const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Restaurant = require("../models/restaurantModel");
const { initializeApp } = require('firebase/app')
const config = require('../config/firebaseConfig.js');
initializeApp(config.firebaseConfig)
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const storage = getStorage();

const create = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.body.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const downloadURL = await _uploadImage(req.file);

    const product = new Product({
      ...req.body,
      category: category._id,
      image: downloadURL,
      restaurant: restaurant._id,
    });
    await product.save();

    restaurant.products.push(product._id);
    await restaurant.save();

    category.products.push(product._id);
    await category.save();

    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const _uploadImage = async (file) => {
  try{
    const dateTime = _giveCurrentDateTime();
    
    const storageRef = ref(
      storage,
      `Products/${dateTime + "_" + file.originalname}`
    );
    const metadata = {
      contentType: file.mimetype,
    };

    const snapShot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapShot.ref);
    return downloadURL;
  }
  catch(error){
    throw new Error(error);
  }
}

const _giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

const list = async (req, res) => {
  try {
    let products;
    if(req.query.categoryId){
      products = await Product.find({ category: req.query.categoryId });
    }
    else if(req.query.restaurantId){
      products = await Product.find({ restaurant: req.query.restaurantId });
    }
    else products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const update = async (req, res) => {
  try{
    const product = await Product.findById(req.params.productId);
    if(!product){
      return res.status(404).json({ error: "Product not found" });
    }

    const category = await Category.findById(req.body.category);
    if(!category && req.body.category){
      return res.status(404).json({ error: "Category not found" });
    }

    let downloadURL = product.image;
    if(req.file){
      downloadURL =  _uploadImage(req.file);
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {
      ...req.body,
      category: category?._id || product.category,
      image: downloadURL,
    }, { new: true });

    return res.status(200).json(updatedProduct);
  }
  catch(error){
    return res.status(400).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    return res.status(200).json({ message: "Product deleted successfully"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { create, list, update, remove, show };
