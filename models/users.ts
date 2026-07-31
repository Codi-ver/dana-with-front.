import db from "../db.js";
const usersTable = () => {
  try {
    db.exec(`
        CREATE TABLE IF NOT EXIST users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        skill TEXT NOT NULL,
        city TEXT NOT NULL,
        gender TEXT NOT NULL,
        resume TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log("✅ جدول users ایجاد شد");

  } catch (err: any) {
    console.error(err.message);
  }
};

usersTable();

const usersModel = {
    
}