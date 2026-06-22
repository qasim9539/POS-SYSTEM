import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyticsService = {
  // Get summary data
  getSummary: async () => {
    const response = await api.get('/analytics/summary');
    return response.data;
  },
  // Get low stock products
  getLowStock: async () => {
    const response = await api.get('/analytics/low-stock');
    return response.data;
  },
  // Get sales chart data
  getSalesChart: async () => {
    const response = await api.get('/analytics/sales-chart');
    return response.data;
  }
};
