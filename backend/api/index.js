import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "../src/config/db.js";
import contactRouter from "../src/routes/contact.js";
import metaRouter from "../src/routes/meta.js";
import authRouter from "../src/routes/auth.js";
import usersRouter from "../src/routes/users.js";
import resumesRouter from "../src/routes/resumes.js";
import errorHandler from "../src/middleware/errorHandler.js";

dotenv.config();

const app = express();

// connect to DB once
let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected");
  }
}

// middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});

app.use(limiter);

// make sure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    next(err);
  }
});

// routes
app.use("/api/contact", contactRouter);
app.use("/api/meta", metaRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/resumes", resumesRouter);

app.get("/", (req, res) => {
  res.json({ ok: true, service: "resume-backend" });
});

app.use(errorHandler);

export default app;
