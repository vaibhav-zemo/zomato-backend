const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const Bill = require('../models/billModel');

const create = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            cart = new Cart({user: user._id});
            
            const bill = new Bill({itemTotal: 0, tax: 0, platformFee: 0, deliveryFee: 0, discount: 0});
            await bill.save();
            
            cart.bill = bill._id;
            await cart.save();
        }

        res.status(201).json({ cartId: cart._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const cart = await Cart.findOne({ user: user._id }).populate({
            path: 'cartItems',
            populate: {
                path: 'product',
            }
        }).populate('user couponCode bill');
        if(!cart){
            return res.status(400).json({ error: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('cartItems');
        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }
        
        const product = await Product.findById(req.body.productId);
        if (!product) {
            return res.status(400).json({ error: 'Product not found' });
        }
        
        const bill = await Bill.findById(cart.bill);
        let flag = false;
        for(let item of cart.cartItems){
            if(item.product == req.body.productId && item.size == req.body.size){
                item.quantity += 1;
                bill.itemTotal += item.price;
                bill.tax = bill.itemTotal*0.02;
                flag = true;
                break;
            }
        }

        if(!flag){
            cart.cartItems.push({product: req.body.productId, quantity: 1, price: req.body.price, size: req.body.size});
            bill.itemTotal += req.body.price;
            bill.tax = bill.itemTotal*0.02;
            bill.platformFee = 4;
            bill.deliveryFee = 50;
        }

        await bill.save();
        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('cartItems');
        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        const cartItem = cart.cartItems.find(item => item._id==req.params.cartItemId);
        if (!cartItem) {
            return res.status(400).json({ error: 'Product not found in cart' });
        }

        const bill = await Bill.findById(cart.bill);

        bill.itemTotal -= cartItem.price;
        bill.tax = bill.itemTotal*0.02;
        await bill.save();
        
        if(cartItem.quantity > 1){
            cartItem.quantity -= 1;
            await cart.save();
            return res.status(200).json({ message: 'Product quantity reduced by 1' });
        }

        cart.cartItems.pull(cartItem._id);
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const addCoupon = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        const coupon = await Coupon.findById(req.params.couponId);
        if (!coupon) {
            return res.status(400).json({ error: 'Coupon not found' });
        }

        if(cart.couponCode){
            return res.status(400).json({ error: 'Coupon already applied' });
        }

        if(coupon.expiryDate < Date.now()){
            return res.status(400).json({ error: 'Coupon expired' });
        }

        if(coupon.minOrderValue > cart.bill.itemTotal){
            return res.status(400).json({ error: 'Minimum order amount not met' });
        }

        const bill = await Bill.findById(cart.bill);
        if(coupon.discountType == "percentage"){
            bill.discount += Math.min((bill.itemTotal * (coupon.percentageDiscount / 100)), coupon.maximumDiscount);
        }
        else{
            bill.discount += Math.min(coupon.flatDiscount, coupon.maximumDiscount);
        }

        await bill.save();

        cart.couponCode = coupon._id;
        await cart.save();

        res.status(200).json({ message: 'Coupon applied successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const removeCoupon = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        const coupon = await Coupon.findById(req.params.couponId);
        if (!coupon) {
            return res.status(400).json({ error: 'Coupon not found' });
        }

        if(!cart.couponCode){
            return res.status(400).json({ error: 'No coupon applied' });
        }
        
        const bill = await Bill.findById(cart.bill);
        if(coupon.discountType == 'percentage'){
            bill.discount -= Math.min((bill.itemTotal * (coupon.percentageDiscount / 100)), coupon.maximumDiscount);
        }
        else{
            bill.discount -= Math.min(coupon.flatDiscount, coupon.maximumDiscount);
        }

        await bill.save();

        cart.couponCode = null;
        await cart.save();

        res.status(200).json({ message: 'Coupon removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {show, create, addProduct, removeProduct, addCoupon, removeCoupon}
