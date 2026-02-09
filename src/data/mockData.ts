import { Product, Seller, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    sellerId: 'seller1',
    sellerName: 'TechZone Electronics',
    sellerLocation: 'T. Nagar, Chennai',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    description: 'Latest iPhone with Pro camera system and A17 Pro chip',
    price: 134900,
    originalPrice: 139900,
    category: 'smartphones',
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    features: ['A17 Pro chip', '48MP camera', '128GB storage', '6.1" display'],
    specifications: {
      'Display': '6.1" Super Retina XDR',
      'Processor': 'A17 Pro',
      'Storage': '128GB',
      'Camera': '48MP + 12MP + 12MP'
    },
    stock: 15,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 245,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    sellerId: 'seller2',
    sellerName: 'Digital World',
    sellerLocation: 'Anna Nagar, Chennai',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    description: 'Latest iPhone with Pro camera system and A17 Pro chip',
    price: 132900,
    originalPrice: 139900,
    category: 'smartphones',
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    features: ['A17 Pro chip', '48MP camera', '128GB storage', '6.1" display'],
    specifications: {
      'Display': '6.1" Super Retina XDR',
      'Processor': 'A17 Pro',
      'Storage': '128GB',
      'Camera': '48MP + 12MP + 12MP'
    },
    stock: 8,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 189,
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  },
  {
    id: '3',
    sellerId: 'seller1',
    sellerName: 'TechZone Electronics',
    sellerLocation: 'T. Nagar, Chennai',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    description: 'Premium Android flagship with S Pen and advanced AI features',
    price: 124999,
    originalPrice: 129999,
    category: 'smartphones',
    images: ['https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'],
    features: ['Snapdragon 8 Gen 3', '200MP camera', 'S Pen included', '6.8" display'],
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '200MP + 50MP + 10MP + 12MP'
    },
    stock: 12,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 156,
    createdAt: '2024-01-20T11:30:00Z',
    updatedAt: '2024-01-25T16:45:00Z'
  },
  {
    id: '4',
    sellerId: 'seller3',
    sellerName: 'Gadget Hub',
    sellerLocation: 'Adyar, Chennai',
    name: 'MacBook Air M2',
    brand: 'Apple',
    description: 'Ultra-thin laptop with M2 chip for exceptional performance',
    price: 114900,
    originalPrice: 119900,
    category: 'laptops',
    images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
    features: ['M2 chip', '13.6" Liquid Retina display', '8GB RAM', '256GB SSD'],
    specifications: {
      'Display': '13.6" Liquid Retina',
      'Processor': 'Apple M2',
      'RAM': '8GB',
      'Storage': '256GB SSD'
    },
    stock: 6,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 312,
    createdAt: '2024-01-12T08:20:00Z',
    updatedAt: '2024-01-28T12:10:00Z'
  },
  {
    id: '5',
    sellerId: 'seller4',
    sellerName: 'ElectroMart',
    sellerLocation: 'Velachery, Chennai',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    description: 'Industry-leading noise canceling wireless headphones',
    price: 29990,
    originalPrice: 34990,
    category: 'audio',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    features: ['Active Noise Canceling', '30-hour battery', 'Premium sound', 'Touch controls'],
    specifications: {
      'Battery Life': '30 hours',
      'Driver': '30mm',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2'
    },
    stock: 20,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 428,
    createdAt: '2024-01-25T13:45:00Z',
    updatedAt: '2024-01-30T10:20:00Z'
  }
];

export const mockSellers: Seller[] = [
  {
    id: 'seller1',
    email: 'techzone@example.com',
    name: 'Rajesh Kumar',
    role: 'seller',
    businessName: 'TechZone Electronics',
    businessAddress: '123 Main Street, T. Nagar, Chennai - 600017',
    businessPhone: '+91 98765 43210',
    gstin: '33ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    verificationStatus: 'approved',
    documents: {
      aadhaar: 'aadhaar-doc-1.pdf',
      pan: 'pan-doc-1.pdf',
      gstin: 'gstin-doc-1.pdf'
    },
    approvedAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'seller2',
    email: 'digitalworld@example.com',
    name: 'Priya Sharma',
    role: 'seller',
    businessName: 'Digital World',
    businessAddress: '456 Electronics Street, Anna Nagar, Chennai - 600040',
    businessPhone: '+91 87654 32109',
    gstin: '33FGHIJ5678K2L6',
    panNumber: 'FGHIJ5678K',
    verificationStatus: 'approved',
    documents: {
      aadhaar: 'aadhaar-doc-2.pdf',
      pan: 'pan-doc-2.pdf',
      gstin: 'gstin-doc-2.pdf'
    },
    approvedAt: '2024-01-12T11:30:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    customerId: 'customer1',
    customerName: 'Arun Kumar',
    customerEmail: 'arun@example.com',
    customerPhone: '+91 99876 54321',
    items: [
      {
        productId: '1',
        sellerId: 'seller1',
        productName: 'iPhone 15 Pro',
        sellerName: 'TechZone Electronics',
        quantity: 1,
        price: 134900,
        subtotal: 134900
      }
    ],
    totalAmount: 134900,
    deliveryAddress: '789 Residential Colony, Adyar, Chennai - 600020',
    deliveryType: 'delivery',
    paymentMethod: 'Card',
    status: 'shipped',
    createdAt: '2024-01-28T14:20:00Z',
    updatedAt: '2024-01-30T16:45:00Z',
    estimatedDelivery: '2024-02-02T18:00:00Z',
    trackingNumber: 'TRK123456789'
  }
];