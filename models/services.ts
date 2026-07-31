import db from "../db.js";

const servicesTable = () => {
  try {
    db.exec(`
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

    console.log("✅ جدول users ایجاد شد");


  } catch (err: any) {
    console.error(err.message);
  }
};

servicesTable();

interface ICreate {
  name: string,
  description: string,
  creator_id: number
}

const servicesModel = {
  create: (data: ICreate) => {
    const stmt = db.prepare(`
      SELECT INTO serveces (name, description, creator_id)
      VALUES (?, ?, ?)`);

    return stmt.run(data);
  },
  
  remove: (id: number) => {
    const stmt = db.prepare(`DELETE FROM services WHERE id = ?`);
    return stmt.run(id);
  }
}

export default servicesModel;

