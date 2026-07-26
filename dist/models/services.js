export {};
/*import { db } from "../server";

const servicesTable = () => {
  try {
    const table = db.prepare(`
      CREATE TABLE IF NOT EXISTS services(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NUT NULL,
      description TEXT NUT NULL,
      creator_id INTEGER NUT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    table.run();
  } catch (err: any) {
    console.error(err.message);
  }
};

export default servicesTable;
*/
