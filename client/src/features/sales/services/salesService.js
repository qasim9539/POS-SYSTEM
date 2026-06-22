import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const salesService = {
  // Get all sales
  getAllSales: async () => {
    const response = await api.get('/sales');
    return response.data;
  },

  // Get sale by ID
  getSaleById: async (id) => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  // Create a new sale
  createSale: async (saleData) => {
    const response = await api.post('/sales', saleData);
    return response.data;
  },

  // Delete a sale
  deleteSale: async (id) => {
    const response = await api.delete(`/sales/${id}`);
    return response.data;
  },
};
