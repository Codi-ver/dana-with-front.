import { Request, Response, NextFunction } from "express";
interface IUser extends Request {
  user?: {
    role: string;
  };
}

const isAdmin = (
  req: IUser,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (!req.user) {
    return res.status(404).json({ err: "User not found!" });
  }
  if (req.user.role != "ADMIN") {
    return res
      .status(403)
      .json({ err: "This route is accessible only for admins !" });
  }
  return next();
};

export default isAdmin;
