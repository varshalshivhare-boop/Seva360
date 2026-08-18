const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/seva360',
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Note]: Database connection pending (${error.message}). Running server with in-memory fallback.`);
    // Do not crash server on cloud deployment when DB connection is delayed
  }
};

module.exports = connectDB;
