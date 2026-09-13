import db from "../db.js";
const servicesTable = () => {
    try {
        db.exec(`
      CREATE TABLE IF NOT EXISTS services(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NUT NULL,
      description TEXT NUT NULL,
      picture TEXT NUT NULL, 
      creator_id INTEGER NUT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        console.log("✅ جدول users ایجاد شد");
    }
    catch (err) {
        console.error({ "Error in creating table ": err.message });
    }
};
servicesTable();
const servicesModel = {
    create: (data) => {
        const stmt = db.prepare(`
      SELECT INTO serveces (namename, description, creator_id, picture_url)
      VALUES (?, ?, ?, ?)`);
        return stmt.run(data);
    },
    remove: (id) => {
        const stmt = db.prepare(`DELETE FROM services WHERE id = ?`);
        return stmt.run(id);
    },
    getAll: () => {
        const stmt = db.prepare(`SELECT * FROM services`);
        return stmt.all();
    },
    getOne: (id) => {
        const stmt = db.prepare(`SELECT * FROM services WHERE id = ?`);
        return stmt.get(id);
    },
};
export default servicesModel;
