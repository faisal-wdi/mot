import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.MONGO_URL;

const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };

// mongoose.set("stricyQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(baseUrl, connectionParams);
    console.log("Database connected");
  } catch (err) {
    console.log("Error", err.message);
    process.exit(1);
  }
};

export default connectDB;
