import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

interface IUser {
  id: number;
  role: string;
}
interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Response | void => {
  const authHeader = req.header("Authorization")?.split(" ");
  if (!authHeader || authHeader.length != 2) {
    return res.status(403).json({
      err: "This route is protected and you can't have access to it !!",
    });
  }
  const token = authHeader[1];

  try {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const jwtPayload = (jwt as any).verify(token, secret);

    if (!jwtPayload.id) {
      throw new Error("Invalid token payload");
    }
    const stmt = db.prepare(`
      SELECT role, id
      FROM users
      WHERE id = ?`);

    let user = stmt.get(jwtPayload.id) as IUser | undefined;
    if (!user) {
      return res.status(404).json({ err: "User not found!" });
    }

    req.user = user;

    return next();
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

export default authMiddleware;
