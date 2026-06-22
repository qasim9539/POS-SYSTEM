const app = require('../src/app');
const connectDB = require('../src/config/db');

// Vercel serverless environment ke liye database connection zaroori hai
// kyunke Vercel server.js file ko run nahi karta
connectDB();

module.exports = app;
