import db from "../db.js";

const newsTable = () => {
  try {
    db.exec(`
        CREATE TABLE IF NOT EXIST news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT NUT NULL,
        image TEXT,
        author_id INTEGER NOT NULL,
        status TEXT DEFAULT 'draft',
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log("✅ جدول users ایجاد شد");

  } catch (err: any) {
    console.error(err.message);
  }
};

newsTable();

interface ICreate {
  event: string,
  image: string,
  author_id: number
}

const newsModel = {
  getAll: () => {
    const stmt = db.prepare(`SELECT * FROM news`);
    return stmt.get();

  },
  create: (data: ICreate) => {
    const stmt = db.prepare(`
      SELECT INTO news (event, emage, author_id)
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
  publish: (event: string, status: string) => {
    const stmt = db.prepare(`
      SELECT INTO news (event, status) 
      VALUES (?, ?)`);

    return stmt.run(event, status);
  },
  
  update: () => {}
}
export default newsModel;
