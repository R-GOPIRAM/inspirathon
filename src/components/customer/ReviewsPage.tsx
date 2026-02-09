import React, { useState } from 'react';
import { Star, ThumbsUp, Camera, Send, ArrowLeft, Filter } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

interface ReviewsPageProps {
  onPageChange: (page: string) => void;
  productId?: string;
}

interface Review {
  id: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  helpfulVotes: number;
  createdAt: string;
}

export default function ReviewsPage({ onPageChange, productId }: ReviewsPageProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'write' | 'my-reviews' | 'product-reviews'>('write');
  const [newReview, setNewReview] = useState({
    productId: productId || '',
    orderId: '',
    rating: 0,
    title: '',
    comment: '',
    images: [] as string[]
  });
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for demonstration
  const mockReviews: Review[] = [
    {
      id: '1',
      customerId: 'customer1',
      customerName: 'Arun Kumar',
      productId: '1',
      productName: 'iPhone 15 Pro',
      orderId: 'order1',
      rating: 5,
      title: 'Excellent product and fast delivery!',
      comment: 'Amazing phone with great camera quality. The local store provided excellent service and the delivery was super fast. Highly recommended!',
      images: [],
      isVerifiedPurchase: true,
      helpfulVotes: 12,
      createdAt: '2024-01-28T10:30:00Z'
    },
    {
      id: '2',
      customerId: 'customer2',
      customerName: 'Priya Sharma',
      productId: '1',
      productName: 'iPhone 15 Pro',
      orderId: 'order2',
      rating: 4,
      title: 'Good product, minor issues',
      comment: 'The phone is great overall, but had some minor scratches on arrival. The seller was responsive and offered to exchange it.',
      images: [],
      isVerifiedPurchase: true,
      helpfulVotes: 8,
      createdAt: '2024-01-25T14:20:00Z'
    },
    {
      id: '3',
      customerId: 'customer3',
      customerName: 'Vikram Singh',
      productId: '3',
      productName: 'Samsung Galaxy S24 Ultra',
      orderId: 'order3',
      rating: 5,
      title: 'Best Android phone I\'ve used',
      comment: 'The S Pen functionality is incredible and the camera quality is outstanding. Local pickup was convenient and the seller was very knowledgeable.',
      images: [],
      isVerifiedPurchase: true,
      helpfulVotes: 15,
      createdAt: '2024-01-30T16:45:00Z'
    }
  ];

  const myReviews = mockReviews.filter(review => review.customerId === user?.id);
  const productReviews = productId ? mockReviews.filter(review => review.productId === productId) : mockReviews;

  const handleRatingClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = () => {
    if (!newReview.rating || !newReview.title || !newReview.comment) {
      alert('Please fill in all required fields');
      return;
    }
    
    alert('Review submitted successfully!');
    setNewReview({
      productId: '',
      orderId: '',
      rating: 0,
      title: '',
      comment: '',
      images: []
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these to a storage service
    const imageUrls = files.map((_, index) => 
      `https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400`
    );
    setNewReview({
      ...newReview,
      images: [...newReview.images, ...imageUrls].slice(0, 5)
    });
  };

  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && handleRatingClick(star)}
            className={`${size} ${
              star <= rating 
                ? 'text-amber-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-amber-400' : ''}`}
            disabled={!interactive}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  const renderWriteReview = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h3>
      
      <div className="space-y-6">
        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Product *
          </label>
          <select
            value={newReview.productId}
            onChange={(e) => setNewReview({ ...newReview, productId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a product you purchased</option>
            <option value="1">iPhone 15 Pro - TechZone Electronics</option>
            <option value="3">Samsung Galaxy S24 Ultra - TechZone Electronics</option>
            <option value="5">Sony WH-1000XM5 - ElectroMart</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-2">
            {renderStars(newReview.rating, true, 'w-8 h-8')}
            <span className="text-sm text-gray-600 ml-3">
              {newReview.rating > 0 && `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            type="text"
            value={newReview.title}
            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Summarize your experience"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">{newReview.title.length}/100 characters</p>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            rows={5}
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this product and seller..."
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">{newReview.comment.length}/1000 characters</p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="review-images" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload photos</span>
                  <input
                    id="review-images"
                    name="review-images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each (Max 5 images)</p>
            </div>
            
            {newReview.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                {newReview.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setNewReview({
                        ...newReview,
                        images: newReview.images.filter((_, i) => i !== index)
                      })}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitReview}
            icon={Send}
            className="px-8"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );

  const renderReviewCard = (review: Review) => (
    <div key={review.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 font-medium">
              {review.customerName.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{review.customerName}</h4>
            <div className="flex items-center space-x-2">
              {renderStars(review.rating)}
              {review.isVerifiedPurchase && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </div>
      </div>

      <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
      <p className="text-gray-700 mb-4">{review.comment}</p>

      {review.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review ${index + 1}`}
              className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
              onClick={() => window.open(image, '_blank')}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Product: <span className="font-medium">{review.productName}</span>
        </div>
        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({review.helpfulVotes})</span>
        </button>
      </div>
    </div>
  );

  const filteredReviews = productReviews.filter(review => 
    filterRating === null || review.rating === filterRating
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to write and view reviews.</p>
            <Button onClick={() => onPageChange('login')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={() => onPageChange('browse')}
            className="mb-4"
          >
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">Share your experience and help other customers make informed decisions</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'write', label: 'Write Review', count: null },
                { key: 'my-reviews', label: 'My Reviews', count: myReviews.length },
                { key: 'product-reviews', label: 'All Reviews', count: productReviews.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} {tab.count !== null && `(${tab.count})`}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'write' && renderWriteReview()}

        {activeTab === 'my-reviews' && (
          <div>
            {myReviews.length > 0 ? (
              myReviews.map(renderReviewCard)
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
                <Button onClick={() => setActiveTab('write')}>
                  Write Your First Review
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'product-reviews' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilterRating(null)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterRating === null
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                        filterRating === rating
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>{rating}</span>
                    </button>
                  ))}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            {filteredReviews.length > 0 ? (
              filteredReviews.map(renderReviewCard)
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-500">No reviews match your current filter criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}