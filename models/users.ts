import db from "../db.js";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  age: number;
  skill: string;
  role?: string;
  resume?: string | null;
}

/** A user row without the password hash — safe to send to clients. */
export interface UserRow {
  id: number;
  name: string;
  email: string;
  city: string;
  age: number;
  phone: string;
  skill: string;
  resume: string | null;
  role: string;
  created_at: string;
}

/** Columns that are safe to send to clients. */
const PUBLIC_COLUMNS = "id, name, email, city, age, phone, skill, resume, role, created_at";

const usersModel = {
  getAll: () =>
    db.prepare(`SELECT ${PUBLIC_COLUMNS} FROM users ORDER BY id`).all() as UserRow[],

  getOne: (id: number | bigint) =>
    db
      .prepare(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ?`)
      .get(id) as UserRow | undefined,

  /** Includes the password hash — for authentication only. */
  findByEmail: (email: string) =>
    db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as
      | (IUser & { id: number; password: string })
      | undefined,

  findByPhone: (phone: string) =>
    db.prepare(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE phone = ?`).get(phone),

  findByIdentifier: (identifier: string) =>
    db
      .prepare(`SELECT * FROM users WHERE email = ? OR phone = ?`)
      .get(identifier, identifier),

  createUser: (data: IUser) => {
    const { name, email, password, city, age, phone, skill, resume } = data;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const role = data.role ?? (resume ? "EMPLOYEE" : "USER");

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, city, age, phone, skill, role, resume)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    return stmt.run(
      name,
      email,
      hashedPassword,
      city,
      age,
      phone,
      skill,
      role,
      resume ?? null,
    );
  },

  deleteUser: (id: number) =>
    db.prepare(`DELETE FROM users WHERE id = ?`).run(id),
};

export default usersModel;
