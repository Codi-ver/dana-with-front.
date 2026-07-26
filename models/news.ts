/*import db from "../server";

const newsTable = () => {
  try {
    const table = db.prepare(`
        CREATE TABLE IF NOT EXIST news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT NUT NULL,
        image TEXT,
        author_id INTEGER NOT NULL,
        status TEXT DEFAULT 'draft',
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    table.run();
  } catch (err: any) {
    console.error(err.message);
  }
};

export default newsTable;
*/