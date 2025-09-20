import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import journalRoutes from "./routes/journalRoute.js";
import meditationRoutes from "./routes/meditationRoute.js";
import musicRoutes from "./routes/musicRoute.js";
import resourceRoutes from "./routes/resourceRoute.js";
import exerciseRoutes from "./routes/exerciseRoute.js";
import scoreRoutes from "./routes/scoreRoute.js";



dotenv.config();

const app = express();


app.use(cors({
  origin: "https://mindbloom-frontend-cr16.onrender.com",
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json()); 
app.use(cookieParser()); 

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/meditation", meditationRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/score", scoreRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to your Mind Wellness API!");
});



app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running');
});  