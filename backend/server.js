import cors from "cors";
import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();

import apiRoutes from "./routes/apiRoutes.js";

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use("/", (req, res) => {
  return res.send("Api is running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});
