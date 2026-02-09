import React from 'react';
import { Store, Shield, Truck, Users, CheckCircle, MapPin, Star, TrendingUp } from 'lucide-react';
import Button from '../common/Button';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const features = [
    {
      icon: Shield,
      title: 'Verified Sellers',
      description: 'All sellers are verified through government documents and business authentication'
    },
    {
      icon: Store,
      title: 'Local Businesses',
      description: 'Support your local retailers and discover products near you'
    },
    {
      icon: Truck,
      title: 'Flexible Delivery',
      description: 'Choose between home delivery or convenient store pickup'
    },
    {
      icon: Users,
      title: 'Compare Prices',
      description: 'Compare the same product across multiple local stores'
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: 'Government-verified seller authentication' },
    { icon: CheckCircle, text: 'Real-time inventory from local stores' },
    { icon: CheckCircle, text: 'Competitive pricing with price comparison' },
    { icon: CheckCircle, text: 'Support for local economy and businesses' },
    { icon: CheckCircle, text: 'Faster delivery through hyperlocal network' },
    { icon: CheckCircle, text: 'Personal service from trusted local retailers' }
  ];

  const stats = [
    { number: '500+', label: 'Verified Local Stores', icon: Store },
    { number: '10,000+', label: 'Happy Customers', icon: Users },
    { number: '50,000+', label: 'Products Available', icon: TrendingUp },
    { number: '4.8/5', label: 'Customer Rating', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Supporting Local Retailers in the
              <span className="text-blue-600 block">Digital Age</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Bridge the gap between traditional retail and e-commerce. Help local businesses compete 
              with online giants while providing customers with the best shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onPageChange('browse')}
                className="px-8"
              >
                Start Shopping
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onPageChange('seller-register')}
                className="px-8"
              >
                Register Your Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LocalMart?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing local retail by connecting verified local businesses 
              with customers through a trusted, efficient platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Platform Benefits
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <benefit.icon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  onClick={() => onPageChange('browse')}
                  size="lg"
                  className="px-8"
                >
                  Explore Platform
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Retailers</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center space-x-3">
                  <Store className="w-5 h-5 text-blue-600" />
                  <span>Create your digital storefront</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Reach more local customers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Increase sales and visibility</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Build trust through verification</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => onPageChange('seller-register')}
                  className="w-full"
                >
                  Join as Retailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Support Local Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of customers who are already supporting their local retailers 
            while getting the best products and prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onPageChange('browse')}
              className="px-8 bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Shopping Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onPageChange('seller-register')}
              className="px-8 border-white text-white hover:bg-blue-700"
            >
              Register Your Business
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}