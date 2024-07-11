const Order = require('../models/orderModel');
const Customer = require('../models/customerModel');
const Cart = require('../models/cartModel');
const Bill = require('../models/billModel');

const create = async (req, res) => {
    try {
        const customer = await Customer.findOne({userId: req.params.userId});
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const bill = await Bill.findById(cart.bill);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        const newBill = new Bill({
            itemTotal: bill.itemTotal,
            discount: bill.discount,
            tax: bill.tax,
            deliveryFee: bill.deliveryFee,
            platformFee: bill.platformFee,
        });
        await newBill.save();

        const { shippingAddress, phoneNumber, name } = req.body;
        const order = new Order({...req.body, user: req.params.userId, orderItems: cart.cartItems, bill: newBill._id, couponCode: cart.couponCode});
        await order.save();

        customer.orders.push(order._id);
        await customer.save();

        cart.cartItems = [];
        cart.couponCode = null;
        bill.itemTotal = 0;
        bill.discount = 0;
        bill.tax = 0;
        bill.deliveryFee = 0;
        bill.platformFee = 0;

        await cart.save();
        await bill.save();

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const list = async (req, res) => {
    try {
        const customer = await Customer.find({userId: req.params.userId});
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const orders = await Order.find({ user: req.params.userId });
        return res.status(201).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
            }
        }).populate('bill');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const { status, payment } = req.body;
        
        order.status = status;
        order.payment = payment;
        await order.save();

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { create, show, list, update };