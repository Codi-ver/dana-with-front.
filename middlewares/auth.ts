import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export const COOKIE_NAME = "dana_token";

const loadUser = (id: number) =>
  db
    .prepare(`SELECT id, name, email, role FROM users WHERE id = ?`)
    .get(id) as { id: number; name: string; email: string; role: string } | undefined;

/**
 * Verifies the JWT from the httpOnly cookie (Authorization: Bearer also
 * accepted for API clients) and attaches the fresh user record to req.user.
 * Rejects the request when there is no valid session.
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const bearer = req.header("Authorization")?.split(" ");
  const token = req.cookies?.[COOKIE_NAME] ?? (bearer?.length === 2 ? bearer[1] : undefined);

  if (!token) {
    res.status(401).json({ err: "ابتدا وارد حساب خود شوید" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const payload = jwt.verify(token, secret) as { id?: number };
    if (!payload.id) throw new Error("Invalid token payload");

    const user = loadUser(Number(payload.id));
    if (!user) {
      res.status(401).json({ err: "کاربر یافت نشد" });
      return;
    }

    req.user = user;
    next();
  } catch {
    // invalid signature, expired token, unknown user, …
    res.status(401).json({ err: "نشست شما منقضی شده، دوباره وارد شوید" });
  }
};

/**
 * Same as requireAuth but never rejects — attaches req.user when a valid
 * session exists and continues anonymously otherwise.
 */
export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const bearer = req.header("Authorization")?.split(" ");
  const token = req.cookies?.[COOKIE_NAME] ?? (bearer?.length === 2 ? bearer[1] : undefined);
  if (!token) {
    next();
    return;
  }
  try {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    const payload = jwt.verify(token, secret) as { id?: number };
    if (payload.id) {
      req.user = loadUser(Number(payload.id));
    }
  } catch {
    // anonymous
  }
  next();
};

export default requireAuth;
