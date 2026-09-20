import db from "../db.js";

export interface ICreateNews {
  title: string;
  event: string;
  image: string | null;
  authorId: number;
}

/** author name is joined in so the UI never needs a second round-trip. */
const SELECT_WITH_AUTHOR = `
  SELECT n.id, n.title, n.image, n.event, n.author_id, n.status,
         n.created_at, n.updated_at, u.name AS author_name
  FROM news n
  LEFT JOIN users u ON u.id = n.author_id`;

const newsModel = {
  getAll: (publishedOnly = true) =>
    db
      .prepare(
        `${SELECT_WITH_AUTHOR}
         ${publishedOnly ? "WHERE n.status = 'published'" : ""}
         ORDER BY datetime(n.created_at) DESC`,
      )
      .all(),

  getLatest: (limit = 3) =>
    db
      .prepare(
        `${SELECT_WITH_AUTHOR}
         WHERE n.status = 'published'
         ORDER BY datetime(n.created_at) DESC
         LIMIT ?`,
      )
      .all(limit),

  getOne: (id: number) =>
    db.prepare(`${SELECT_WITH_AUTHOR} WHERE n.id = ?`).get(id),

  create: (data: ICreateNews) => {
    const { title, event, image, authorId } = data;
    return db
      .prepare(
        `INSERT INTO news (title, event, image, author_id, status)
         VALUES (?, ?, ?, ?, 'published')`,
      )
      .run(title, event, image, authorId);
  },

  publish: (id: number) =>
    db
      .prepare(
        `UPDATE news SET status = 'published', updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
      )
      .run(id),

  deleteNew: (id: number) =>
    db.prepare(`DELETE FROM news WHERE id = ?`).run(id),
};

export default newsModel;
