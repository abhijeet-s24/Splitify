const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoUri = "mongodb://localhost:27017/splitwise-clone";

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(mongoUri);
};

module.exports = connectDatabase;
