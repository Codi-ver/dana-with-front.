import type { Request, Response } from "express";
import usersModel from "../models/users.js";

const getAll = (_req: Request, res: Response) => {
  res.json(usersModel.getAll());
};

const getOne = (req: Request<{ id: string }>, res: Response) => {
  const user = usersModel.getOne(Number(req.params.id));
  if (!user) {
    return res.status(404).json({ err: "کاربر یافت نشد" });
  }
  return res.json(user);
};

const deleteUser = (req: Request<{ id: string }>, res: Response) => {
  const result = usersModel.deleteUser(Number(req.params.id));
  if (result.changes === 0) {
    return res.status(404).json({ err: "کاربر یافت نشد" });
  }
  return res.json({ message: "کاربر حذف شد" });
};

export { getAll, getOne, deleteUser };
