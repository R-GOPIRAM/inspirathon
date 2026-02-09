const express = require('express');
const Seller = require('../models/Seller');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Register as seller
router.post('/register', auth, async (req, res) => {
  try {
    const existingSeller = await Seller.findOne({ userId: req.user._id });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller profile already exists' });
    }
    
    const seller = new Seller({
      userId: req.user._id,
      ...req.body
    });
    
    await seller.save();
    res.status(201).json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all sellers (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && status !== 'all') {
      query.verificationStatus = status;
    }
    
    const sellers = await Seller.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get seller profile
router.get('/profile', auth, authorize('seller'), async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id })
      .populate('userId', 'name email');
    
    if (!seller) {
      return res.status(404).json({ message: 'Seller profile not found' });
    }
    
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update seller verification status (admin only)
router.patch('/:id/verify', auth, authorize('admin'), async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const seller = await Seller.findById(req.params.id);
    
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    
    seller.verificationStatus = status;
    
    if (status === 'approved') {
      seller.approvedAt = new Date();
      seller.rejectedAt = undefined;
      seller.rejectionReason = undefined;
    } else if (status === 'rejected') {
      seller.rejectedAt = new Date();
      seller.rejectionReason = rejectionReason;
      seller.approvedAt = undefined;
    }
    
    await seller.save();
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;