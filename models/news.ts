import db from "../db.js";

const newsTable = async () => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image TEXT,
      event TEXT,
      author_id INTEGER NOT NULL,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
    console.log("✅ جدول news ایجاد شد");
  } catch (err: any) {
    console.error(err.message);
  }
};

await newsTable();

interface ICreate {
  event: string;
  image: string;
  creator: number;
}
const newsModel = {
  getAll: () => db.prepare(`SELECT * FROM news`).all(),

  create: (data: ICreate) => {
    const { event, image, creator } = data;

    const stmt = db.prepare(`
      SELECT INTO news (event, image, creator)
      VALUES (?, ?, ?)`);

    return stmt.run(event, image, creator);
  },

  deleteNew: (id: number) =>
    db
      .prepare(
        `
      DELETE * FROM news WHERE id = ?`,
      )
      .run(id),

  getOne: (id: number) => db.prepare(`SELECT * FROM news WHERE id = ?`).get(id),

  publish: (id: number) =>
    db
      .prepare(
        `
      SET status = 'published' WHERE id = ?`,
      )
      .run(id),

  getLatest: () => {
    const stmt = db.prepare(`SELECT *
      FROM news 
      ORDER BY created_at DESC 
      LIMIT ?
    `);

    return stmt.all(2);
  },
};
export default newsModel;
