const Category = require('../models/categoryModels');

const { ObjectId } = require('mongodb');
const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const { id , keyword = ''} = req.query;
      const find = ObjectId.isValid(id)
        ? [{ _id: ObjectId(value) }]
        : [{ name: { $regex:  keyword, $options: 'i' } }];
        const categories = await Category.find(
        {
          $or: find
        }
      )
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      let { name } = req.body;
      name = name.trim().toLowerCase();
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: 'This category already exists' });
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json({ msg: 'Created a category', category: newCategory });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  updateCategory: async (req, res) => {
    try {
      const { category_id, name } = req.body;
      let result = await Category.findByIdAndUpdate(
        category_id,
        { name: name.trim().toLowerCase() },
        { new: true }
      );
      return res.status(200).json({ msg: 'Updated a category',category:  result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeCategory: async (req, res) => {
    const { id } = req.body;
    try {
      await Category.findByIdAndDelete(id, (err, value) => {
        return res
          .status(200)
          .json({ msg: 'Delete Category Success', category: value });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = categoryCtrl;
