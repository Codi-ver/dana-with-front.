import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import usersModel from "../models/users.js";
import { COOKIE_NAME } from "../middlewares/auth.js";

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // یک هفته

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: TOKEN_TTL_SECONDS * 1000,
  path: "/",
};

const issueSession = (userId: number) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_TTL_SECONDS,
  });

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  city: string;
  age: number | string;
  phone: string;
  skill: string;
}

const register = (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { name, email, password, city, age, phone, skill } = req.body ?? {};

  if (!name || !email || !password || !city || !age || !phone || !skill) {
    return res.status(400).json({ err: "همه فیلدها الزامی هستند" });
  }
  if (String(password).length < 6) {
    return res
      .status(400)
      .json({ err: "رمز عبور باید حداقل ۶ کاراکتر باشد" });
  }
  if (Number.isNaN(Number(age)) || Number(age) < 1) {
    return res.status(400).json({ err: "سن واردشده معتبر نیست" });
  }

  try {
    if (usersModel.findByEmail(email)) {
      return res
        .status(409)
        .json({ err: "کاربری با این ایمیل قبلاً ثبت‌نام کرده است" });
    }
    if (usersModel.findByPhone(phone)) {
      return res
        .status(409)
        .json({ err: "کاربری با این شماره تماس قبلاً ثبت‌نام کرده است" });
    }

    const result = usersModel.createUser({
      name,
      email,
      password,
      city,
      age: Number(age),
      phone,
      skill,
    });

    const user = usersModel.getOne(Number(result.lastInsertRowid));
    if (!user) {
      return res.status(500).json({ err: "خطا در ایجاد کاربر" });
    }

    res.cookie(COOKIE_NAME, issueSession(Number(user.id)), cookieOptions);
    return res.status(201).json({ message: "ثبت‌نام با موفقیت انجام شد", user });
  } catch (err) {
    console.error("register:", err);
    return res.status(500).json({ err: "خطای داخلی سرور" });
  }
};

const login = (req: Request<{}, {}, { email?: string; password?: string }>, res: Response) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ err: "ایمیل و رمز عبور الزامی است" });
  }

  try {
    const user = usersModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ err: "ایمیل یا رمز عبور اشتباه است" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ err: "ایمیل یا رمز عبور اشتباه است" });
    }

    res.cookie(COOKIE_NAME, issueSession(Number(user.id)), cookieOptions);
    return res.json({
      message: "با موفقیت وارد شدید",
      user: usersModel.getOne(Number(user.id)),
    });
  } catch (err) {
    console.error("login:", err);
    return res.status(500).json({ err: "خطای داخلی سرور" });
  }
};

const logout = (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  return res.json({ message: "با موفقیت خارج شدید" });
};

const me = (req: Request, res: Response) => {
  // requireAuth guarantees req.user here
  return res.json({ user: usersModel.getOne(req.user!.id) ?? req.user });
};

export { register, login, logout, me };
