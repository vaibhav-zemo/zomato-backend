const User = require('../models/userModel');
const Customer = require('../models/customerModel');

const show = async (req, res) => {
    try {
        const customer = await Customer.findOne({userId: req.params.id}).populate('userId');
        if(!customer){
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(201).json(customer);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const list = async (req, res) => {
    try {
        const customers = await Customer.find({}).populate('userId');
        return res.status(201).json(customers);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const customer = await Customer.findOneAndDelete({userId: req.params.id});
        return res.status(201).json({ message: 'User deleted successfully'});
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const {name, dob, gender, email} = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, {$set: 
            {
                name: name,
                email: email,
            }
        }, { new: true });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if(dob || gender){
            const customer = await Customer.findOneAndUpdate({userId: req.params.id}, {$set:
                {
                    dob: dob,
                    gender: gender
                }
            }, {new: true}).populate('userId');

            if(!customer){
                return res.status(404).json({ error: 'Customer not found' });
            }
            return res.status(201).json(customer);
        }
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {show, list, remove, update}