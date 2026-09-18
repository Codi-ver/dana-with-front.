import db from "../db.js";
import bcrypt from "bcrypt";

const usersTable = async () => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      city TEXT NOT NULL,
      age INTEGER NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      skill TEXT ,
      resume TEXT,
      role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER', 'EMPLOYEE')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    console.log("✅ جدول users ایجاد شد");
  } catch (err: any) {
    console.error("❌ خطا:", err.message);
  }
};

await usersTable();

interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  age: number;
  skill: string;
  role: string;
  resume: string;
}

const usersModel = {
  getAll: () =>
    db
      .prepare(
        `
      SELECT * FROM users`,
      )
      .all(),

  deleteUser: (id: string) =>
    db.prepare(`DELETE FROM users WHERE id = ?`).run(id),

  findByEmail: (email: string) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as any;
  },

  findByPhone: (phone: string) => {
    const stmt = db.prepare("SELECT * FROM users WHERE phone = ?");
    return stmt.get(phone);
  },

  findByIdentifier: (identifier: string) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ? OR phone = ?");
    return stmt.get(identifier, identifier);
  },

  createUser: (data: IUser) => {
    const { name, email, password, city, age, phone, skill, resume } = data;
    const hashedPassword = bcrypt.hashSync(password, 12);

    const userRole = resume ? "EMPLOYEE" : "USER";

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, city, age, phone, skill, role, resume)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
    return stmt.run(
      name,
      email,
      hashedPassword,
      city,
      age,
      phone,
      skill ?? null,
      userRole,
      resume ?? null,
    );
  },

  getOne: (id: number | bigint) =>
    db
      .prepare(
        `
      SELECT id, name, email, city, age, phone, skill, role 
      FROM users WHERE id = ?
      `,
      )
      .get(id),
};

export default usersModel;
