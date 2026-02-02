const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      process.env.MONGO_URL ||
      process.env.MONGO_PUBLIC_URL ||
      process.env.MONGO_PRIVATE_URL ||
      process.env.MONGODB_URI;

    console.log("Mongo URI being used:", uri);

    if (!uri) {
      throw new Error(
        "MongoDB connection string not found. Please set MONGO_URI or link MongoDB service."
      );
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
