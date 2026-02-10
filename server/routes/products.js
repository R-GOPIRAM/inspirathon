const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/products?search=phone&category=Electronics&page=1&limit=12
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 12 } = req.query;

    const query = { isAvailable: true };
    if (category) query.category = new RegExp(`^${category}$`, 'i');
    if (search) query.name = { $regex: search, $options: 'i' };

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('shopOwnerId', 'name email')
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize),
      Product.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id).populate('shopOwnerId', 'name email');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', auth, authorize('seller', 'admin'), async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, shopOwnerId: req.user._id });
    return res.status(201).json({ success: true, message: 'Product created', product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/:id', auth, authorize('seller', 'admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const isOwner = product.shopOwnerId.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You can edit only your products' });
    }

    Object.assign(product, req.body);
    await product.save();

    return res.status(200).json({ success: true, message: 'Product updated', product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', auth, authorize('seller', 'admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const isOwner = product.shopOwnerId.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You can delete only your products' });
    }

    await product.deleteOne();
    return res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
