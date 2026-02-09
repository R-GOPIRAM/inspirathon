const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;
    
    // Verify customer purchased the product
    const order = await Order.findOne({
      _id: orderId,
      customerId: req.user._id,
      'items.productId': productId,
      status: 'delivered'
    });
    
    if (!order) {
      return res.status(400).json({ message: 'You can only review products you have purchased and received' });
    }
    
    // Check if review already exists
    const existingReview = await Review.findOne({
      productId,
      customerId: req.user._id,
      orderId
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    
    const review = new Review({
      productId,
      customerId: req.user._id,
      orderId,
      rating,
      title,
      comment,
      images: images || []
    });
    
    await review.save();
    
    // Update product rating
    await updateProductRating(productId);
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'newest' } = req.query;
    
    let sort = {};
    switch (sortBy) {
      case 'oldest':
        sort.createdAt = 1;
        break;
      case 'rating-high':
        sort.rating = -1;
        break;
      case 'rating-low':
        sort.rating = 1;
        break;
      case 'helpful':
        sort.helpfulVotes = -1;
        break;
      default:
        sort.createdAt = -1;
    }
    
    const reviews = await Review.find({
      productId: req.params.productId,
      isApproved: true
    })
      .populate('customerId', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Review.countDocuments({
      productId: req.params.productId,
      isApproved: true
    });
    
    // Get rating distribution
    const ratingStats = await Review.aggregate([
      { $match: { productId: req.params.productId, isApproved: true } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);
    
    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      ratingStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's reviews
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ customerId: req.user._id })
      .populate('productId', 'name images')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark review as helpful
router.patch('/:id/helpful', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    review.helpfulVotes += 1;
    await review.save();
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to update product rating
async function updateProductRating(productId) {
  const stats = await Review.aggregate([
    { $match: { productId, isApproved: true } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount: stats[0].totalReviews
    });
  }
}

module.exports = router;