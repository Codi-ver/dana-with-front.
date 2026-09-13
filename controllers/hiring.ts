import { Request, Response } from "express";
import hiringModel from "../models/hiring.js";
import usersModel from "../models/users.js";

const fill = async (req: Request, res: Response) => {
  hiringModel.filling(req.body);
  usersModel.createUser(req.body);

  res.json("User hired successfully :)");
};
export default fill;
