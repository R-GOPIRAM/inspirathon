import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, FileText, Store, User, Phone, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { mockSellers } from '../../data/mockData';
import { Seller } from '../../types';
import Button from '../common/Button';

interface SellerVerificationPageProps {
  onPageChange: (page: string) => void;
}

export default function SellerVerificationPage({ onPageChange }: SellerVerificationPageProps) {
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [sellers, setSellers] = useState<Seller[]>([
    ...mockSellers,
    {
      id: 'seller3',
      email: 'gadgethub@example.com',
      name: 'Suresh Patel',
      role: 'seller',
      businessName: 'Gadget Hub',
      businessAddress: '789 Tech Street, Adyar, Chennai - 600020',
      businessPhone: '+91 76543 21098',
      gstin: '33KLMNO9012P3Q7',
      panNumber: 'KLMNO9012P',
      verificationStatus: 'pending',
      documents: {
        aadhaar: 'aadhaar-doc-3.pdf',
        pan: 'pan-doc-3.pdf',
        gstin: 'gstin-doc-3.pdf'
      }
    },
    {
      id: 'seller4',
      email: 'electromart@example.com',
      name: 'Kavitha Reddy',
      role: 'seller',
      businessName: 'ElectroMart',
      businessAddress: '321 Electronics Plaza, Velachery, Chennai - 600042',
      businessPhone: '+91 65432 10987',
      gstin: '33RSTUV3456W4X8',
      panNumber: 'RSTUV3456W',
      verificationStatus: 'pending',
      documents: {
        aadhaar: 'aadhaar-doc-4.pdf',
        pan: 'pan-doc-4.pdf',
        gstin: 'gstin-doc-4.pdf',
        laborCert: 'labor-cert-4.pdf'
      }
    }
  ]);

  const filteredSellers = sellers.filter(seller => 
    filter === 'all' || seller.verificationStatus === filter
  );

  const handleApprove = (sellerId: string) => {
    setSellers(prev => prev.map(seller => 
      seller.id === sellerId 
        ? { ...seller, verificationStatus: 'approved' as const, approvedAt: new Date().toISOString() }
        : seller
    ));
    setSelectedSeller(null);
  };

  const handleReject = (sellerId: string, reason: string) => {
    setSellers(prev => prev.map(seller => 
      seller.id === sellerId 
        ? { 
            ...seller, 
            verificationStatus: 'rejected' as const, 
            rejectedAt: new Date().toISOString(),
            rejectionReason: reason
          }
        : seller
    ));
    setSelectedSeller(null);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Verification</h1>
          <p className="text-gray-600">Review and verify seller applications</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Applications', count: sellers.length },
                { key: 'pending', label: 'Pending Review', count: sellers.filter(s => s.verificationStatus === 'pending').length },
                { key: 'approved', label: 'Approved', count: sellers.filter(s => s.verificationStatus === 'approved').length },
                { key: 'rejected', label: 'Rejected', count: sellers.filter(s => s.verificationStatus === 'rejected').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seller List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Seller Applications ({filteredSellers.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredSellers.map((seller) => (
                  <div
                    key={seller.id}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSeller?.id === seller.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedSeller(seller)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Store className="w-5 h-5 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {seller.businessName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(seller.verificationStatus)}`}>
                            {getStatusIcon(seller.verificationStatus)}
                            <span className="ml-1 capitalize">{seller.verificationStatus}</span>
                          </span>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {seller.name} • {seller.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {seller.businessPhone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {seller.businessAddress}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                          {seller.gstin && (
                            <span>GST: {seller.gstin}</span>
                          )}
                          <span>PAN: {seller.panNumber}</span>
                          <span>
                            Documents: {Object.values(seller.documents).filter(Boolean).length}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSeller(seller);
                        }}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredSellers.length === 0 && (
                <div className="p-12 text-center">
                  <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-500">No seller applications match the current filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Seller Details Panel */}
          <div className="lg:col-span-1">
            {selectedSeller ? (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedSeller.verificationStatus)}`}>
                      {getStatusIcon(selectedSeller.verificationStatus)}
                      <span className="ml-1 capitalize">{selectedSeller.verificationStatus}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Business Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Business Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Business Name:</span>
                        <span className="ml-2 text-gray-900">{selectedSeller.businessName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Owner Name:</span>
                        <span className="ml-2 text-gray-900">{selectedSeller.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <span className="ml-2 text-gray-900">{selectedSeller.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 text-gray-900">{selectedSeller.businessPhone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Address:</span>
                        <span className="ml-2 text-gray-900">{selectedSeller.businessAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Legal Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Legal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">PAN Number:</span>
                        <span className="ml-2 text-gray-900 font-mono">{selectedSeller.panNumber}</span>
                      </div>
                      {selectedSeller.gstin && (
                        <div>
                          <span className="text-gray-500">GST Number:</span>
                          <span className="ml-2 text-gray-900 font-mono">{selectedSeller.gstin}</span>
                        </div>
                      )}
                      {selectedSeller.laborDeptCert && (
                        <div>
                          <span className="text-gray-500">Labor Cert:</span>
                          <span className="ml-2 text-gray-900">{selectedSeller.laborDeptCert}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedSeller.documents).map(([docType, fileName]) => (
                        fileName && (
                          <div key={docType} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-900 capitalize">
                                {docType.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Eye}
                              onClick={() => alert(`Viewing ${fileName}`)}
                            >
                              View
                            </Button>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Verification Actions */}
                  {selectedSeller.verificationStatus === 'pending' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Verification Actions</h4>
                      <div className="space-y-2">
                        <Button
                          variant="success"
                          icon={CheckCircle}
                          onClick={() => handleApprove(selectedSeller.id)}
                          className="w-full"
                        >
                          Approve Seller
                        </Button>
                        <Button
                          variant="danger"
                          icon={XCircle}
                          onClick={() => {
                            const reason = prompt('Enter rejection reason:');
                            if (reason) handleReject(selectedSeller.id, reason);
                          }}
                          className="w-full"
                        >
                          Reject Application
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Status Information */}
                  {selectedSeller.verificationStatus !== 'pending' && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Status Information</h4>
                      <div className="space-y-2 text-sm">
                        {selectedSeller.approvedAt && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approved on {new Date(selectedSeller.approvedAt).toLocaleDateString()}
                          </div>
                        )}
                        {selectedSeller.rejectedAt && (
                          <div>
                            <div className="flex items-center text-red-600 mb-2">
                              <XCircle className="w-4 h-4 mr-2" />
                              Rejected on {new Date(selectedSeller.rejectedAt).toLocaleDateString()}
                            </div>
                            {selectedSeller.rejectionReason && (
                              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-red-800 text-sm">
                                  <strong>Reason:</strong> {selectedSeller.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
                <p className="text-gray-500">Choose a seller application from the list to review details and documents.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}