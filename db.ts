import Database from "better-sqlite3";

const db: Database.Database = new Database(
  "/home/razie/programming/projects/dana-site/db/database.db",
);

try {
  db.prepare("SELECT 1").get();
  console.log(`✅ Connected to database successfully :)`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error("❌ Failed to connect to database:", message);
  process.exit(1);
}

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

export default db;
