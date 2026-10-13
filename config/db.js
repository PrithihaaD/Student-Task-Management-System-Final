const mongoose = require("mongoose");

// Connects to MongoDB.
// Production: connectDB() uses the existing MONGO_URI from .env.
// Tests: connectDB(uri) passes a temporary in-memory database URI,
// so automated tests never touch the live database.
const connectDB = async (uri = process.env.MONGO_URI) => {
    if (!uri) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    const connection = await mongoose.connect(uri);

    console.log("MongoDB connected");

    return connection;
};

module.exports = connectDB;
