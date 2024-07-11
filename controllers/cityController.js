const City = require('../models/cityModel.js');

const list = async (req, res) => {
    try {
        const cities = await City.find();
        return res.status(201).json(cities);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const newCity = new City({...req.body});
        await newCity.save();
        return res.status(201).json(newCity);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id,
            { name: req.body.name || city.name },
            { new: true }
        )
        city.resturants.push(req.body.resturant);
        await city.save();

        if(!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        return res.status(201).json(city);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const show = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        return res.status(201).json(city);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            res.status(404).json({ message: 'City not found' });
        }

        return res.status(201).json({ message: 'City removed' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {list, create, update, show, remove};