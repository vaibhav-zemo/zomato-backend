const Category = require('../models/categoryModel');
const City = require('../models/cityModel');

const create = async (req, res) => {
    try {
        const city = await City.findOne({name: req.body.city});
        if (!city) {
            return res.status(400).send({ error: 'City not found' });
        }

        const category = new Category({...req.body, city: city._id});
        await category.save();
        
        city.categories.push(category);
        await city.save();

        return res.status(201).send(category);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const list = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        console.log(category)
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }

        const city = await City.findById(category.city);
        city.categories.remove(category);
        await city.save();

        return res.send({ message: 'Category removed' });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    create,
    list,
    remove
}