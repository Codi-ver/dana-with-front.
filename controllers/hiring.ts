import { Request, Response } from "express";
import userModel from "../models/users.js";

const fill = async (req: Request, res: Response) => {
  userModel.createUser(req.body);
  res.json("User hired successfully :)");
};
export default fill;
