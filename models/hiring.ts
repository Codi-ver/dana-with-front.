import db from "../db.js";

export interface ICreateHiring {
  userId: number | null;
  name: string;
  email: string;
  age: number;
  skill: string;
  city: string;
  resume: string;
}

const hiringModel = {
  /** Job applications, newest first. user is null for anonymous applicants. */
  getAll: () =>
    db
      .prepare(
        `SELECT h.id, h.name, h.email, h.age, h.skill, h.city, h.resume,
                h.created_at, u.name AS user_name
         FROM hiring h
         LEFT JOIN users u ON u.id = h.user_id
         ORDER BY datetime(h.created_at) DESC`,
      )
      .all(),

  create: (data: ICreateHiring) => {
    const { userId, name, email, age, skill, city, resume } = data;
    return db
      .prepare(
        `INSERT INTO hiring (user_id, name, email, age, skill, city, resume)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(userId, name, email, age, skill, city, resume);
  },
};

export default hiringModel;
