import { fileURLToPath } from "url";
import { dirname } from "path";
import Database from "better-sqlite3";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db: Database.Database = new Database(
  path.join(__dirname, "..", "db", "database.db"),
);

try {
  db.prepare("SELECT 1").get();
  console.log("✅ Connected to database successfully.");
} catch (err: any) {
  console.error("❌ Failed to connect to database:", err.message);
  process.exit(1);
}
db.prepare("PRAGMA foreign_keys = ON").run();

export default db;
