/*import { db } from "../server";

const commentsTable = () => {
  try {
    const table = db.prepare(`
        CREATE TABLE IF NOT EXISTS comments(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        comment TEXT NOT NULL,
        author_id INTEGER NOT NULL
        FOREIGN KEY (author_id) REFERENCES users(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        


  } catch (err: any) {
    console.error(err.message);
  }
};
*/
