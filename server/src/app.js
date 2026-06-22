const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Feature routes
const productRoutes = require('./features/products/product.routes');
app.use('/api/products', productRoutes);

const saleRoutes = require('./features/sales/sale.routes');
app.use('/api/sales', saleRoutes);

const analyticsRoutes = require('./features/analytics/analytics.routes');
app.use('/api/analytics', analyticsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

module.exports = app;
