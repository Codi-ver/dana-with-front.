import app from "./app.js";
import db from "./db.js";
import env from "dotenv";
env.config();

app.listen(4000, () => {
  console.log(`🚀 Server running on port 4000`);
});

process.on("SIGINT", () => {
  db.close();
  console.log("🔄 Database closed.");
  process.exit(0);
});
