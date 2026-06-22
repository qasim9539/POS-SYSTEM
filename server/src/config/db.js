const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pos_system');
        console.log(`\n===========================================`);
        console.log(`🚀 MongoDB Database Successfully Connected!`);
        console.log(`🌐 Host: ${conn.connection.host}`);
        console.log(`===========================================\n`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
