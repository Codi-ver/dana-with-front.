export {};
/*import { db } from "../server";

const hiringTable = () => {
  try {
    const table = db.prepare(`
        CREATE TABLE IF NOT EXISTS hiring (
        id INTEGER PRIMARY KEY AUTOINCRENENT,
        user_id INTEGER NOT NULL,
        resume TEXT,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    table.run();
  } catch (err: any) {
    console.error(err.message);
  }
};

export default hiringTable;
*/ 
