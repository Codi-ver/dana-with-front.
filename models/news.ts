import db from "../db.js";

const newsTable = () => {
  try {
    db.exec(`
        CREATE TABLE IF NOT EXIST news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NUT NULL,
        image TEXT,
        event TEXT,
        creator INTEGER NOT NULL,
        status TEXT DEFAULT 'draft',
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULsubmittedT CURRENT_TIMESTAMP
    )`);
    console.log("✅ جدول users ایجاد شد");
  } catch (err: any) {
    console.error(err.message);
  }
};

newsTable();

interface ICreate {
  event: string;
  image: string;
  author_id: number;
}

const newsModel = {
  getAll: () => {
    const stmt = db.prepare(`SELECT * FROM news`);
    return stmt.get();
  },
  create: (data: ICreate) => {
    const stmt = db.prepare(`
      SELECT INTO news (event, image, creator)
      VALUES (?, ?, ?)`);

    return stmt.run(data);
  },
  deleteNew: (id: number) => {
    const stmt = db.prepare(`
      DELETE * FROM news WHERE id = ?`);

    return stmt.run(id);
  },
  getOne: (id: number) => {
    const stmt = db.prepare(`
      SELECT * FROM news WHERE id = ?`);
    return stmt.get(id);
  },
  publish: (id: number) => {
    const stmt = db.prepare(`
      SET status = 'published' WHERE id = ?`);

    return stmt.run(id);
  },
  getLatest: () => {
    const stmt = db.prepare(`SELECT *
      FROM news 
      ORDER BY created_at DESC 
      LIMIT ?
    `);

    return stmt.all(3);
  },

  update: () => {},
};
export default newsModel;
