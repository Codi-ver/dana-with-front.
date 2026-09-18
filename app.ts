import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import hiringRouter from "./routes/hiring.js";
import servicesRouter from "./routes/services.js";
import newsRouter from "./routes/news.js";
import usersRouter from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.use("/hiring", hiringRouter);
app.use("/services", servicesRouter);
app.use("/news", newsRouter);
app.use("/users", usersRouter);

export default app;
