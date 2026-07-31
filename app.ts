import express from "express";
import cors from "cors";
const app = express();
app.use(cors);
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
//import commentsRouter from "./routes/comments.js";
//import contactRouter from "./routes/contactUs.js";
//import hiringRouter from "./routes/hiring.js";
//import newsRouter from "./routes/news.js";
//import servicesRouter from "./routes/services.js";
//import usersRouter from "./routes/users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);

//app.use("/comments", commentsRouter);
//app.use("/contactUs", contactRouter);
//app.use("/hiring", hiringRouter);
//app.use("/news", newsRouter);
//app.use("/services", servicesRouter);
//app.use("/users", usersRouter);


export default app;