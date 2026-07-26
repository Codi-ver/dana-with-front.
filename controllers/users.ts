import { Request, Response } from "express";
import db from "../db.js";
interface IResponse {
  err?: string;
  data?: any;
}

const getAll = (res: Response): void => {
  const stmt = db.prepare(`
        SELECT * FROM users`);

  const users = stmt.all();
  res.json(users);
};
const deleteUser = (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
): Response<IResponse> => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(403).json({ err: "Id not valid!" });
  }
  try {
    const getStmt = db.prepare(`
            SELECT * FROM users
            WHERE id= ?`);

    const user = getStmt.get(id);
    if (!user) {
      return res.status(404).json({ err: "User not found!" });
    }

    const deleteStmt = db.prepare(`
        DELETE FROM users WHERE id = ?`);
    const info = deleteStmt.run(id);

    if (info.changes > 0) {
      return res.json({
        data: {message: "User deleted successfully!", info} 
      });
    } else {
      return res.status(500).json({ err: "Failed to delete user!" });
    }
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};

interface IUpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  city?: string;
  age?: number;
  phone?: string;
  skill?: string;
}

const updateUser = (
  req: Request<{ id: string }, {}, IUpdateUserBody >,
  res: Response,
) : Response<IResponse>=> {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(403).json({ err: "Id not valid!" });
  }
  try {
    const getStmt = db.prepare(`
            SELECT * FROM users
            WHERE id= ?`);

    const user = getStmt.get(id);
    if (!user) {
      return res.status(404).json({ err: "User not found!" });
    }

    // from this

    const allowed = ["name", "email","password", "city","age", "phone","skill"];
    const fields = Object.keys(req.body)  //[name= ?,phone= ?]
      .filter((k) => allowed.includes(k))
      .map((k) => `${k} = ?`);   

    const values = Object.keys(req.body) // name, phone
      .filter((k) => allowed.includes(k))
      .map((k) => (req.body as any )[k]);  

    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    db.prepare(query).run(...values);
    return res.json({ data : user });
    
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};
const getOne = (req: Request<{id: string}, {}, {}>, res: Response): Response<IResponse> => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(403).json({ err: "Id not valid!" });
    }
    try {
        const getStmt = db.prepare(`
            SELECT * FROM users
            WHERE id= ?`);

        const user = getStmt.get(id);
        if (!user) {
            return res.status(404).json({ err: "User not found!" });
        }
        return res.json(user);
    }
    catch(err: any) {
        return res.status(500).json({ err: err.message });
    }
}

export { getAll, deleteUser, updateUser, getOne };
