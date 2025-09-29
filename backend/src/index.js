import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();
const FRONTEND_URL = process.env.CLIENT_URL;
const ADDITIONAL_ORIGINS = process.env.CORS_ADDITIONAL_ORIGINS || ""; // comma-separated
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// Build CORS allowlist: includes env CLIENT_URL, localhost dev origins, and any additional comma-separated origins
const defaultDevOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
const additionalOrigins = ADDITIONAL_ORIGINS
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const allowlist = [...new Set([FRONTEND_URL, ...defaultDevOrigins, ...additionalOrigins].filter(Boolean))];

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin or non-browser requests (no origin)
      if (!origin) return callback(null, true);
      if (allowlist.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["set-cookie"],
  })
);

// Explicitly handle preflight for all routes
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running at http://localhost:" + PORT);
  connectDB();
});
