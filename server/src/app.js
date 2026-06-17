const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Feature routes
const authRoutes = require('./features/auth/auth.routes');
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

module.exports = app;
