import React, { useState } from 'react';
import { ArrowLeft, Copy, Download, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

interface PaymentPageProps {
  onPageChange: (page: string) => void;
}

interface MerchantDetails {
  shopName: string;
  merchantQR: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

export default function PaymentPage({ onPageChange }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank' | 'card'>('upi');
  const [orderTotal] = useState(4789);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const merchantDetails: MerchantDetails = {
    shopName: 'TechZone Electronics',
    merchantQR: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
    bankName: 'ICICI Bank',
    accountHolderName: 'Tech Zone Electronics Pvt Ltd',
    accountNumber: '1234567890123456',
    ifscCode: 'ICIC0001234',
    upiId: 'techzone@icici',
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onPageChange('order-confirmation');
      }, 2000);
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-2">Order ID: ORD123456789</p>
            <p className="text-lg font-bold text-blue-600 mb-6">₹{orderTotal.toLocaleString('en-IN')}</p>
            <p className="text-gray-600 mb-8">Thank you for your order. You will be redirected shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => onPageChange('cart')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
        <p className="text-gray-600 mb-8">Choose your preferred payment method</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* UPI Payment */}
            <div
              onClick={() => setPaymentMethod('upi')}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">UPI Payment</h3>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'upi' ? 'border-blue-600' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'upi' && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Scan QR Code to Pay</p>
                    <img
                      src={merchantDetails.merchantQR}
                      alt="Merchant QR"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Or transfer to UPI ID:</p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <code className="text-sm font-mono text-gray-900">{merchantDetails.upiId}</code>
                      <button
                        onClick={() => handleCopy(merchantDetails.upiId, 'UPI ID')}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedText === 'UPI ID' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handlePaymentSuccess}
                    size="lg"
                    className="w-full"
                  >
                    Confirm Payment
                  </Button>
                </div>
              )}
            </div>

            {/* Bank Transfer */}
            <div
              onClick={() => setPaymentMethod('bank')}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Bank Transfer</h3>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'bank' ? 'border-blue-600' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'bank' && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
              </div>

              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Merchant Name</p>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{merchantDetails.shopName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{merchantDetails.bankName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Account Holder Name</p>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{merchantDetails.accountHolderName}</p>
                        <button
                          onClick={() => handleCopy(merchantDetails.accountHolderName, 'Account Holder')}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedText === 'Account Holder' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Account Number</p>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <code className="text-sm font-mono text-gray-900">{merchantDetails.accountNumber}</code>
                        <button
                          onClick={() => handleCopy(merchantDetails.accountNumber, 'Account Number')}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedText === 'Account Number' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">IFSC Code</p>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <code className="text-sm font-mono text-gray-900">{merchantDetails.ifscCode}</code>
                        <button
                          onClick={() => handleCopy(merchantDetails.ifscCode, 'IFSC Code')}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedText === 'IFSC Code' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePaymentSuccess}
                    size="lg"
                    className="w-full"
                  >
                    I Have Made the Payment
                  </Button>
                </div>
              )}
            </div>

            {/* Card Payment */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Credit/Debit Card</h3>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'card' && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/25"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePaymentSuccess}
                    size="lg"
                    className="w-full"
                  >
                    Pay ₹{orderTotal.toLocaleString('en-IN')}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹4,499</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹290</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{orderTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Note:</span> Your order will be confirmed once payment is received.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
