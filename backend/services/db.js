const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
