import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
  },
  googleLogin: async ({ token, clientId }) => {   // ✅ fixed destructuring
    try {
      // Send token field as expected by backend
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, clientId }),   // ✅ backend receives { token: "..." }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Google login API error:", error);
      
      // If backend is unreachable in development, provide fallback authentication for testing
      if (process.env.NODE_ENV === 'development' && error.message.includes('Failed to fetch')) {
        console.warn("Backend unreachable - using development fallback authentication");
        
        // Mock successful auth response
        return {
          success: true,
          user: {
            id: 'dev-user-1',
            displayName: 'Dev User',
            email: 'dev@example.com',
            isPrimeMember: false,
          },
          token: 'dev-token-123'
        };
      }
      
      throw new Error('Google sign-in failed');
    }
  },
};

export const products = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
  getByBranch: (branch, page = 0, size = 12) => 
    api.get(`/products/branch/${branch}?page=${page}&size=${size}`),
  search: (query) => 
    api.get(`/products/search?q=${query}`),
  addToCart: (productId, quantity = 1) => 
    api.post('/cart/add', { productId, quantity })
};

export async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default api;
