const Restaurant = require('../models/restaurantModel');
const User = require('../models/userModel');
const Address = require('../models/addressModel');
const City = require('../models/cityModel');

const create = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).send('Customer not found');
        }
        const city = await City.findOne({name: req.body.city});
        if (!city) {
            return res.status(404).send('City not found');
        }

        const {street, houseNumber, postalCode, name, isPureVeg, image, menu, license} = req.body;
        const address = new Address({
            street,
            city: city.name,
            houseNumber,
            postalCode
        });
        await address.save();

        const restaurant = new Restaurant({
            name,
            address: address._id,
            owner: user._id,
            isPureVeg,
            image,
            menu,
            license
        });        
        await restaurant.save();
        
        return res.status(201).send(restaurant);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const show = async (req, res) => {
    try {
        let restaurant;
        if(req.query.city) {
            const city = await City.findOne({name: req.query.city});
            if (!city) {
                return res.status(404).send('City not found');
            }
            let restaurants = await Restaurant.find({}).populate('address owner');
            restaurant = restaurants.filter(restaurant => restaurant.address.city === city.name);
        }
        else if(req.query.restaurantId){
            restaurant = await Restaurant.findById(req.query.restaurantId).populate('address owner');
        }
        else if(req.query.userId){
            const user = await User.findById(req.query.userId);
            if (!user) {
                return res.status(404).send('Customer not found');
            }

            restaurant = await Restaurant.findOne({owner: user._id}).populate('address owner');
        }
        else {
            restaurant = await Restaurant.find({}).populate('address owner');
        }
        
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }
        return res.status(200).send(restaurant);
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {create, show}