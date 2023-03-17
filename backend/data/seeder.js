import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../db/db.js";
import User from "../model/userModel.js";
import users from "./user.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log(`Data imported`);

    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log(`Data deleted`);

    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
