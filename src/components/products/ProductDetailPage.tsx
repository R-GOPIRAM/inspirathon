import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Share2, MapPin, Clock, Truck, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

interface ProductDetailPageProps {
  onPageChange: (page: string) => void;
  productId?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  description: string;
  images: string[];
  seller: {
    name: string;
    rating: number;
    reviews: number;
    location: string;
  };
  specifications: Record<string, string>;
  warranty: string;
  deliveryTime: string;
  returnPolicy: string;
}

export default function ProductDetailPage({ onPageChange, productId }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct({
      id: productId || '1',
      name: 'iPhone 15 Pro Max',
      price: 99999,
      rating: 4.8,
      reviewCount: 1250,
      stock: 15,
      category: 'Electronics',
      description: 'Experience the ultimate in smartphone technology with the iPhone 15 Pro Max. Featuring the powerful A17 Pro chip, advanced dual camera system with 48MP main camera, always-on display, and all-day battery life. The stunning 6.7-inch Super Retina XDR display delivers incredible picture quality. Designed with aerospace-grade titanium and Ceramic Shield for durability. 5G ready for blazing-fast connectivity.',
      images: [
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      seller: {
        name: 'TechZone Electronics',
        rating: 4.9,
        reviews: 5420,
        location: 'Mumbai, India',
      },
      specifications: {
        'Display': '6.7-inch Super Retina XDR',
        'Processor': 'Apple A17 Pro',
        'Storage': '256GB',
        'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
        'Battery': 'Up to 29 hours',
        'Charging': 'USB-C 20W',
        'Water Resistance': 'IP68',
        'Colors': 'Titanium Black, White, Gold, Blue',
      },
      warranty: '1 Year Apple Limited Warranty',
      deliveryTime: 'Delivery by Tomorrow',
      returnPolicy: '7 Days Easy Return',
    });
  }, [productId]);

  const handleAddToCart = () => {
    alert(`${quantity} item(s) added to cart!`);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    onPageChange('checkout');
  };

  if (!product) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onPageChange('browse')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images Section */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Price */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="text-3xl font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</div>
                <div className="text-sm text-gray-600 mt-2">Inclusive of all taxes</div>
              </div>

              {/* Seller Info */}
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{product.seller.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-gray-700">{product.seller.rating}</span>
                  </div>
                  <span className="text-gray-600">({product.seller.reviews} reviews)</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {product.seller.location}
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Display: {product.specifications['Display']}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Processor: {product.specifications['Processor']}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Camera: {product.specifications['Camera']}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Battery: {product.specifications['Battery']}</span>
                  </div>
                </div>
              </div>

              {/* Delivery & Return Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-gray-600">Delivery</div>
                    <div className="font-medium text-gray-900">{product.deliveryTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-gray-600">Returns</div>
                    <div className="font-medium text-gray-900">{product.returnPolicy}</div>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">({product.stock} available)</span>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    icon={ShoppingCart}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>

                <button
                  onClick={() => navigator.share?.({ title: product.name, text: `Check out ${product.name}` })}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Full Specifications */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">{key}</span>
                  <span className="text-gray-900 font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warranty & Return */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Warranty</h3>
                <p className="text-gray-700">{product.warranty}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Return Policy</h3>
                <p className="text-gray-700">{product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
