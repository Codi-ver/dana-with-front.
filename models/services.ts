import db from "../db.js";

export interface ICreateService {
  name: string;
  description: string;
  creatorId: number;
  image: string;
}

const SELECT_WITH_CREATOR = `
  SELECT s.id, s.name, s.description, s.image, s.creator_id,
         s.created_at, s.updated_at, u.name AS creator_name
  FROM services s
  LEFT JOIN users u ON u.id = s.creator_id`;

const servicesModel = {
  getAll: () =>
    db.prepare(`${SELECT_WITH_CREATOR} ORDER BY datetime(s.created_at) DESC`).all(),

  getOne: (id: number) =>
    db.prepare(`${SELECT_WITH_CREATOR} WHERE s.id = ?`).get(id),

  create: (data: ICreateService) => {
    const { name, description, creatorId, image } = data;
    return db
      .prepare(
        `INSERT INTO services (name, description, creator_id, image)
         VALUES (?, ?, ?, ?)`,
      )
      .run(name, description, creatorId, image);
  },

  remove: (id: number) =>
    db.prepare(`DELETE FROM services WHERE id = ?`).run(id),
};

export default servicesModel;
