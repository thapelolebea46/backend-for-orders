import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "*" // For testing, allows all origins
  // later you can restrict to your frontend URL
}));
app.use("/api", orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });