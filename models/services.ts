import db from "../db.js";

const servicesTable = async () => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      creator_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
    )`);

    console.log("✅ جدول services ایجاد شد");
  } catch (err: any) {
    console.error({ "Error in creating table ": err.message });
  }
};

await servicesTable();

interface ICreateService {
  name: string;
  description: string;
  creator_id: number;
  image: string;
}

const servicesModel = {
  create: (data: ICreateService) => {
    const { name, description, creator_id, image } = data;
    const stmt = db.prepare(`
      INSERT INTO services (name, description, creator_id, image)
      VALUES (?, ?, ?, ?)`);

    return stmt.run(name, description, creator_id, image);
  },

  remove: (id: number) =>
    db.prepare(`DELETE FROM services WHERE id = ?`).run(id),

  getAll: () => db.prepare(`SELECT * FROM services`).all(),

  getOne: (id: number) =>
    db.prepare(`SELECT * FROM services WHERE id = ?`).get(id),
};

export default servicesModel;
