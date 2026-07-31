import db from "../db.js";

const hiringTable = () => {
  try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS hiring (
        id INTEGER PRIMARY KEY AUTOINCRENENT,
        user_id INTEGER NOT NULL,
        resume TEXT,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log("✅ جدول users ایجاد شد");

  } catch (err: any) {
    console.error(err.message);
  }
};

hiringTable();

interface IFilling {
  user_id : number,
  resume: string
}

const hiringModel = {
  filling: (data: IFilling) => {
    const stmt = db.prepare(`
      INSERT INTO hiring (user_id, resume)
      VALUES (?, ?)`);
    return stmt.get(data);
  }
};

export default hiringModel;