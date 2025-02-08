import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://mentora-alpha.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routes);

export default app;
