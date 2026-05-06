const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoUri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/splitwise-clone";

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(mongoUri);
};

module.exports = connectDatabase;
