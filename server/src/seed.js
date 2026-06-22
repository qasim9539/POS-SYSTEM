require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./features/products/product.model');
const Sale = require('./features/sales/sale.model');
const Notification = require('./features/notifications/notification.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pos_system';

const initialProducts = [
  { sku: "8801097230412", name: "Wireless Headphones Pro", category: "Electronics", sellingPrice: 248.00, purchasePrice: 120.00, stockQuantity: 142, lowStockThreshold: 10, description: "Premium sound canceling headphones." },
  { sku: "8801097230559", name: "Smart Watch Series X", category: "Electronics", sellingPrice: 449.00, purchasePrice: 210.00, stockQuantity: 38, lowStockThreshold: 5, description: "Multi-functional smart wearable." },
  { sku: "8801097230665", name: "Running Shoes Pro", category: "Clothing", sellingPrice: 215.00, purchasePrice: 89.00, stockQuantity: 5, lowStockThreshold: 15, description: "Lightweight professional running sneakers." },
  { sku: "8801097230771", name: "USB-C Hub 7-Port", category: "Electronics", sellingPrice: 69.00, purchasePrice: 28.00, stockQuantity: 204, lowStockThreshold: 20, description: "High speed multi-port extension hub." },
  { sku: "8801097230887", name: "Coffee Blend Premium 1kg", category: "Food & Bev", sellingPrice: 15.00, purchasePrice: 6.50, stockQuantity: 8, lowStockThreshold: 10, description: "Rich aromatic roasted coffee beans." },
  { sku: "8801097230993", name: "Garden Tool Set 5-Piece", category: "Home & Garden", sellingPrice: 70.00, purchasePrice: 31.00, stockQuantity: 0, lowStockThreshold: 5, description: "Premium heavy-duty rust-free gardening tools." },
  { sku: "8801097230101", name: "Noise Cancelling Earbuds", category: "Electronics", sellingPrice: 129.00, purchasePrice: 55.00, stockQuantity: 91, lowStockThreshold: 10, description: "True wireless smart sports earbuds." },
  { sku: "8801097230202", name: "Yoga Mat Non-Slip", category: "Clothing", sellingPrice: 45.00, purchasePrice: 18.00, stockQuantity: 67, lowStockThreshold: 8, description: "Eco-friendly non-slip exercise yoga mat." }
];

const seedDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB!');

    console.log('🧹 Clearing existing collections...');
    await Product.deleteMany({});
    await Sale.deleteMany({});
    await Notification.deleteMany({});
    console.log('✅ Collections cleared!');

    console.log('🌱 Seeding initial products...');
    await Product.insertMany(initialProducts);
    console.log('✅ Products seeded successfully!');

    console.log('🔔 Seeding initial notifications...');
    await Notification.insertMany([
      { title: "System Ready", message: "POS System successfully initialized and seeded with mock inventory.", type: "success" },
      { title: "Stock Alert", message: "Garden Tool Set 5-Piece is currently Out of Stock (0 units remaining).", type: "warning" },
      { title: "Stock Alert", message: "Running Shoes Pro stock level is low (5 units remaining).", type: "info" }
    ]);
    console.log('✅ Notifications seeded successfully!');

    console.log('===========================================');
    console.log('🎉 Database seeding complete!');
    console.log('===========================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
