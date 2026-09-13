import db from "../db.js";
const hiringTable = () => {
    try {
        db.exec(`
        CREATE TABLE IF NOT EXISTS hiring (
        id INTEGER PRIMARY KEY AUTOINCRENENT,
        user_id INTEGER NOT NULL,
        name INTEGER NOT NULL,
        email TEXT NOT NULL,
        age INTEGER NOT NULL,
        skill TEXT NOT NULL,
        city TEXT NOT NULL,
        resume TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        console.log("✅ جدول users ایجاد شد");
    }
    catch (err) {
        console.error(err.message);
    }
};
hiringTable();
const hiringModel = {
    filling: (data) => {
        const stmt = db.prepare(`
      INSERT INTO hiring (user_id, name, email, age, skill, city, resume)
      VALUES (1, ?, ?, ?, ?, ?, ?)`);
        return stmt.run(data);
    },
};
export default hiringModel;
