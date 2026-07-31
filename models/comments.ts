import { answer } from "../controllers/comments.js";
import  db  from "../db.js";

const commentsTable = () => {
  try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS comments(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        comment TEXT NOT NULL,
        author_id INTEGER NOT NULL
        service_id TEXT NOT NULL,
        answer TEXT DEFAULT NULL,
        FOREIGN KEY (service_id) REFERENCES services(id),
        FOREIGN KEY (author_id) REFERENCES users(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        console.log("✅ جدول users ایجاد شد");
    }
    catch(err: any) {
      console.error('❌ خطا:', err.message);
    }
};

 commentsTable();

interface ICreateComment {
  comment: string,
  author_id: number,
  service_id: number
}


const commentModel = {
  findById : (id: number) => {
    const stmt = db.prepare(`SELECT * FROM comments WHERE id = ?`);
    return stmt.get(id);
  },
  
  createComment: (data: ICreateComment) => {
    const stmt = db.prepare(`
      INSERT INTO comments (comments, author_id, service_id) 
      VALUES (?, ?, ?)`);

    return stmt.get(data);
  },

  removeComment :  (id: number) => {
    const stmt = db.prepare(`
    DELETE FROM users WHERE id = ?;`);
    return stmt.get(id);
  },

  allComments : () => {
    const stmt = db.prepare(`SELECT * FROM comments`);
    return stmt.get();
  },

  answerToComment : (id: number, answer: string) => {
    const stmt = db.prepare(`UPDATE comments SET answer = ? WHERE id = ?`)
    return stmt.run(answer, id);
  }
}

export default commentModel;
