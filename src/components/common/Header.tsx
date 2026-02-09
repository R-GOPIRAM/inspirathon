import React from 'react';
import { ShoppingCart, User, Store, Menu, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from './Button';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    logout();
    onPageChange('home');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onPageChange('home')}
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <Store className="h-8 w-8 text-blue-600" />
              <span>IndiaStore</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onPageChange('browse')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'browse'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Browse Products
            </button>

            {user?.role === 'seller' && (
              <>
                <button
                  onClick={() => onPageChange('seller-dashboard')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'seller-dashboard'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  My Dashboard
                </button>
                <button
                  onClick={() => onPageChange('seller-orders')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'seller-orders'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  My Orders
                </button>
              </>
            )}

            {user?.role === 'customer' && (
              <button
                onClick={() => onPageChange('my-orders')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'my-orders'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                My Orders
              </button>
            )}

            {user?.role === 'admin' && (
              <button
                onClick={() => onPageChange('seller-verification')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'seller-verification'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Verify Sellers
              </button>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {user?.role === 'customer' && (
              <button
                onClick={() => onPageChange('cart')}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <span className="text-gray-500 capitalize">({user.role})</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button onClick={() => onPageChange('login')} variant="outline" size="sm">
                  Login
                </Button>
                <Button onClick={() => onPageChange('seller-register')} size="sm">
                  Become a Seller
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
