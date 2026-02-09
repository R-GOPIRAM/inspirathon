import React from 'react';
import { MapPin, Star, ShoppingCart, Eye, Check, Store } from 'lucide-react';
import { Product } from '../../types';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  variants?: Product[];
  viewMode: 'grid' | 'list';
  isSelected: boolean;
  onSelect: () => void;
  onAddToCart: (product: Product) => void;
  showComparison: boolean;
}

export default function ProductCard({
  product,
  variants = [],
  viewMode,
  isSelected,
  onSelect,
  onAddToCart,
  showComparison
}: ProductCardProps) {
  const minPrice = variants.length > 0 ? Math.min(...variants.map(v => v.price)) : product.price;
  const maxPrice = variants.length > 0 ? Math.max(...variants.map(v => v.price)) : product.price;
  const priceRange = minPrice !== maxPrice;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex space-x-6">
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            {showComparison && (
              <button
                onClick={onSelect}
                className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              >
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.brand}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {priceRange ? `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}` : `₹${product.price.toLocaleString()}`}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
            
            {variants.length > 1 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Available from {variants.length} stores:
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.slice(0, 3).map((variant) => (
                    <div key={variant.id} className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md">
                      <Store className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{variant.sellerName}</span>
                      <span className="text-sm font-medium text-blue-600">₹{variant.price.toLocaleString()}</span>
                    </div>
                  ))}
                  {variants.length > 3 && (
                    <div className="text-sm text-blue-600">+{variants.length - 3} more</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {product.sellerLocation}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  icon={ShoppingCart}
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {showComparison && (
          <button
            onClick={onSelect}
            className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isSelected 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          >
            {isSelected && <Check className="w-4 h-4" />}
          </button>
        )}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Save ₹{(product.originalPrice - product.price).toLocaleString()}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="text-lg font-bold text-gray-900">
            {priceRange ? `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}` : `₹${product.price.toLocaleString()}`}
          </div>
          {product.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </div>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {product.sellerName}, {product.sellerLocation}
        </div>
        
        {variants.length > 1 && (
          <div className="mb-3 text-sm text-blue-600">
            Available from {variants.length} stores
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            icon={Eye}
          >
            View
          </Button>
          <Button
            size="sm"
            className="flex-1"
            icon={ShoppingCart}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}