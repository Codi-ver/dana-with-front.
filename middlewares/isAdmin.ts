import type { Request, Response, NextFunction } from "express";

/** Runs after requireAuth — rejects non-admin sessions. */
const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ err: "این بخش فقط برای مدیران سایت است" });
    return;
  }
  next();
};

export default isAdmin;
