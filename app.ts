import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import hiringRouter from "./routes/hiring.js";
import servicesRouter from "./routes/services.js";
import newsRouter from "./routes/news.js";
import usersRouter from "./routes/users.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(
  cors({
    // any localhost origin in dev; explicit CLIENT_URL (or its default) otherwise
    origin: (origin, cb) => {
      const allowed =
        !origin ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
        origin === (process.env.CLIENT_URL ?? "http://localhost:3000");
      cb(null, allowed);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);
app.use("/hiring", hiringRouter);
app.use("/services", servicesRouter);
app.use("/news", newsRouter);
app.use("/users", usersRouter);

app.use((_req, res) => {
  res.status(404).json({ err: "Route not found" });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌", err.message);
  res.status(500).json({ err: err.message || "Internal server error" });
});

export default app;
