// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sessionsRouter from "./routes/sessions.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------- MIDDLEWARE -----------------
// Enable CORS
app.use(cors());

// Parse JSON request bodies BEFORE routes
app.use(express.json());

// ----------------- ROUTES -----------------
app.use("/api/sessions", sessionsRouter);
app.use("/api/auth", authRouter);

// Simple test route
app.get("/", (req, res) => {
  res.send("ParaTrain backend is running!");
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
