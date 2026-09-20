import Database from "better-sqlite3";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DB_PATH =
  process.env.DB_PATH ?? path.join(__dirname, "db", "database.db");

const db: Database.Database = new Database(DB_PATH);

try {
  db.prepare("SELECT 1").get();
  console.log(`✅ Connected to database at ${DB_PATH}`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error("❌ Failed to connect to database:", message);
  process.exit(1);
}

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

const columnNames = (table: string): string[] =>
  (
    db.prepare(`PRAGMA table_info(${table})`).all() as {
      name: string;
    }[]
  ).map((c) => c.name);

const addColumnIfMissing = (table: string, column: string, ddl: string) => {
  if (!columnNames(table).includes(column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
    console.log(`✅ Column ${table}.${column} added`);
  }
};

const migrate = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      city TEXT NOT NULL,
      age INTEGER NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      skill TEXT NOT NULL,
      resume TEXT,
      role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER', 'EMPLOYEE')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image TEXT,
      event TEXT,
      author_id INTEGER NOT NULL,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE);

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      creator_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE);
  `);

  // users.resume is part of the schema but missing in older databases.
  addColumnIfMissing("users", "resume", "TEXT");

  // hiring.user_id was NOT NULL, which blocks anonymous job applications.
  // Rebuild the table with a nullable user_id (safe: copy rows across).
  const hiringUserRow = (
    db.prepare("PRAGMA table_info(hiring)").all() as {
      name: string;
      notnull: number;
    }[]
  ).find((c) => c.name === "user_id");
  if (hiringUserRow && hiringUserRow.notnull === 1) {
    console.log("🔄 Rebuilding hiring table (user_id becomes nullable)…");
    db.pragma("foreign_keys = OFF");
    const rebuild = db.transaction(() => {
      db.exec(`
        CREATE TABLE hiring_new (
          id INTEGER PRIMARY KEY,
          user_id INTEGER,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          age INTEGER NOT NULL,
          skill TEXT NOT NULL,
          city TEXT NOT NULL,
          resume TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL);
        INSERT INTO hiring_new (id, user_id, name, email, age, skill, city, resume, created_at, updated_at)
          SELECT id, user_id, name, email, age, skill, city, resume, created_at, updated_at FROM hiring;
        DROP TABLE hiring;
        ALTER TABLE hiring_new RENAME TO hiring;
      `);
    });
    try {
      rebuild();
      console.log("✅ hiring table rebuilt");
    } finally {
      db.pragma("foreign_keys = ON");
    }
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS hiring (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      age INTEGER NOT NULL,
      skill TEXT NOT NULL,
      city TEXT NOT NULL,
      resume TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL);
  `);

  console.log("✅ Schema is up to date");
};

migrate();

export default db;
