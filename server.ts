import env from "dotenv";
env.config();
import app from "./app.js";
import db from "./db.js";

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  db.close();
  console.log("🔄 Database closed.");
  process.exit(0);
});
