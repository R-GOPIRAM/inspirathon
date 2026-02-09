import React, { useState } from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import { CartContext, useCartProvider } from './hooks/useCart';
import Header from './components/common/Header';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/auth/LoginPage';
import SellerRegistrationPage from './components/seller/SellerRegistrationPage';
import ProductBrowser from './components/products/ProductBrowser';
import SellerVerificationPage from './components/admin/SellerVerificationPage';
import SellerDashboard from './components/seller/SellerDashboard';
import AddProductPage from './components/seller/AddProductPage';
import SellerOrdersPage from './components/seller/SellerOrdersPage';
import CartPage from './components/cart/CartPage';
import MyOrdersPage from './components/customer/MyOrdersPage';
import ReviewsPage from './components/customer/ReviewsPage';
import ProductDetailPage from './components/products/ProductDetailPage';
import PaymentPage from './components/payment/PaymentPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const authContext = useAuthProvider();
  const cartContext = useCartProvider();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'seller-register':
        return <SellerRegistrationPage onPageChange={setCurrentPage} />;
      case 'browse':
        return <ProductBrowser onPageChange={setCurrentPage} />;
      case 'product-detail':
        return <ProductDetailPage onPageChange={setCurrentPage} />;
      case 'seller-verification':
        return <SellerVerificationPage onPageChange={setCurrentPage} />;
      case 'seller-dashboard':
        return <SellerDashboard onPageChange={setCurrentPage} />;
      case 'add-product':
        return <AddProductPage onPageChange={setCurrentPage} />;
      case 'seller-orders':
        return <SellerOrdersPage onPageChange={setCurrentPage} />;
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'checkout':
      case 'payment':
        return <PaymentPage onPageChange={setCurrentPage} />;
      case 'my-orders':
        return <MyOrdersPage onPageChange={setCurrentPage} />;
      case 'reviews':
        return <ReviewsPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <CartContext.Provider value={cartContext}>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          {renderPage()}
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;