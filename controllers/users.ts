import { Request, Response } from "express";
import usersModel from "../models/users.js";

const getAll = async (req: Request, res: Response) => {
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
