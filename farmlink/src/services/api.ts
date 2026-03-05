const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address?: any;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  images: Array<{ url: string; publicId: string }>;
  farmer: string;
  location: any;
  organic: boolean;
  seasonal: boolean;
  available: boolean;
  demand: string;
  rating: number;
  reviewCount: number;
  harvestDate: string;
  expiryDate: string;
  tags: string[];
}

interface Order {
  _id: string;
  orderNumber: string;
  buyer: string;
  farmer: string;
  items: Array<{
    product: string;
    name: string;
    image: string;
    quantity: number;
    unit: string;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  deliveryAddress: any;
  deliverySlot: any;
  createdAt: string;
}

interface APIOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

// Token management
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Base API client
const apiClient = async (endpoint: string, options: APIOptions = {}): Promise<any> => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address?: any;
  }) => {
    return apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },

  getMe: async (): Promise<User> => {
    return apiClient('/auth/me');
  },

  logout: (): void => {
    removeToken();
  },
};

// Product APIs
export const productAPI = {
  getProducts: async (filters: Record<string, any> = {}): Promise<{ success: boolean; data: Product[] }> => {
    const params = new URLSearchParams(filters);
    return apiClient(`/products?${params}`);
  },

  getProduct: async (id: string): Promise<{ success: boolean; data: Product }> => {
    return apiClient(`/products/${id}`);
  },

  createProduct: async (productData: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
    return apiClient('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
    return apiClient(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id: string): Promise<{ success: boolean }> => {
    return apiClient(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  uploadImages: async (id: string, formData: FormData): Promise<{ success: boolean; data: Product }> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/products/${id}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Image upload failed');
    }
    
    return response.json();
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (orderData: Partial<Order>): Promise<{ success: boolean; data: Order }> => {
    return apiClient('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getOrders: async (): Promise<{ success: boolean; data: Order[] }> => {
    return apiClient('/orders');
  },

  getOrder: async (id: string): Promise<{ success: boolean; data: Order }> => {
    return apiClient(`/orders/${id}`);
  },

  updateOrderStatus: async (id: string, statusData: { status: string; rejectionReason?: string; trackingNumber?: string }): Promise<{ success: boolean; data: Order }> => {
    return apiClient(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  },

  cancelOrder: async (id: string, reason: string): Promise<{ success: boolean; data: Order }> => {
    return apiClient(`/orders/${id}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ cancellationReason: reason }),
    });
  },
};

// Chat API
export const chatAPI = {
  sendMessage: async (message: string, userType: string): Promise<{ success: boolean; response: string }> => {
    return apiClient('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, userType }),
    });
  },
};

// Prediction APIs
export const predictionAPI = {
  getPricePrediction: async (crop: string, location?: string): Promise<{ success: boolean; data: any }> => {
    const params = location ? `?location=${location}` : '';
    return apiClient(`/predictions/${crop}${params}`);
  },

  getDemandHeatmap: async (): Promise<{ success: boolean; data: any }> => {
    return apiClient('/demand-heatmap');
  },

  getBuyerMatches: async (productId: string, location: { lat: number; lng: number }): Promise<{ success: boolean; data: any }> => {
    const params = new URLSearchParams({ 
      productId, 
      lat: location.lat.toString(), 
      lng: location.lng.toString() 
    });
    return apiClient(`/matching/buyers?${params}`);
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<{ success: boolean; message: string }> => {
    return apiClient('/health');
  },
};

// Error handling utility
export const handleAPIError = (error: any): void => {
  if (error.message.includes('401') || error.message.includes('Not authorized')) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/signin';
    }
  }
  throw error;
};
