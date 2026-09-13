import { Request, Response } from "express";
import usersModel from "../models/users.js";

const getAll = async (res: Response) => {
  const users = await usersModel.getAll();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  await usersModel.createUser(req.body);
  res.json("New user added successfully :)");
};

const deleteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  const len: number = usersModel.getAll().length;

  const user = await usersModel.deleteUser(req.params.id);

  if (!user) {
    return res.status(404).json({ err: "User not found!" });
  }

  const lenNextDelete: number = usersModel.getAll().length;

  if (lenNextDelete == len - 1) {
    return res.json({ message: "User deleted successfully!" });
  } else {
    return res.status(500).json({ err: "Failed to delete user!" });
  }
};
/*
interface IUpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  city?: string;
  age?: number;
  phone?: string;
  skill?: string;
  resume?: string;
  role: string;
}
  */
/*

const updateUser = (
  req: Request<{ id: string }, {}, IUpdateUserBody>,
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

    // from this

    const allowed = [
      "name",
      "email",
      "password",
      "city",
      "age",
      "phone",
      "skill",
      "resume",
    ];
    const fields = Object.keys(req.body) //[name= ?,phone= ?]
      .filter((k) => allowed.includes(k))
      .map((k) => `${k} = ?`);

    const values = Object.keys(req.body) // name, phone
      .filter((k) => allowed.includes(k))
      .map((k) => (req.body as any)[k]);

    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    db.prepare(query).run(...values);
    return res.json({ data: user });
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};
*/
const getOne = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  const user = await usersModel.getOne(req.params.id);

  if (!user) {
    return res.status(404).json({ err: "User not found!" });
  }
  return res.json(user);
};

const findByEmail = async (
  req: Request<{}, {}, { email: string }>,
  res: Response,
) => {
  const user = await usersModel.findByEmail(req.body.email);
  res.json(user);
};

const findByPhone = async (
  req: Request<{}, {}, { phone: string }>,
  res: Response,
) => {
  const user = await usersModel.findByEmail(req.body.phone);
  res.json(user);
};

const findByIdentifier = async (
  req: Request<{}, {}, { identifier: string }>,
  res: Response,
) => {
  const user = await usersModel.findByEmail(req.body.identifier);
  res.json(user);
};
export {
  getAll,
  deleteUser,
  getOne,
  create,
  findByEmail,
  findByPhone,
  findByIdentifier,
};
