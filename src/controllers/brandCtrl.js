const Brand = require('../models/brandModel');
const { ObjectId } = require('mongodb');

const brandCtrl = {
  getBrands: async (req, res) => {
    try {
      const { id , keyword = ''} = req.query;
      const find = ObjectId.isValid(id)
        ? [{ _id: ObjectId(value) }]
        : [{ name: { $regex:  keyword, $options: 'i' } }];
      const brands = await Brand.find(
        {
          $or: find
        }
      )
      return res.status(200).json(brands);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createBrand: async (req, res) => {
    try {
      let { name, photo } = req.body;
      name = name.trim().toLowerCase();
      const brand = await Brand.findOne({ name });
      if (brand)
        return res.status(400).json({ msg: 'This brand already exists' });
      const newBrand = new Brand({
        name,
        photo
      });
      await newBrand.save();
      return res.status(200).json({ msg: 'Created Brand Success', brand: newBrand });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateBrand: async (req, res) => {
    try {
      const { name, description, photo, brand_id } = req.body;
      let result = await Brand.findByIdAndUpdate(
        { brand_id },
        { name: name.trim().toLowerCase(), description, photo },
        { new: true }
      );
      return res.status(200).json({ msg: 'Updated a brand', brand: result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeBrand: async (req, res) => {
    const { id } = req.body;
    try {
      await Product.find({ 'detail.brand': id }).then(async value => {
        if (value.length) {
          return res
            .status(400)
            .json({ msg: 'Remove products from this brand first  ' });
        }
        await Brand.findByIdAndDelete(id, (err, value) => {
          return res.status(200).json({ msg: 'Delete Brand Success', brand: value });
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = brandCtrl;
