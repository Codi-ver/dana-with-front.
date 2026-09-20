import type { Request, Response } from "express";
import hiringModel from "../models/hiring.js";

interface HiringBody {
  name: string;
  email: string;
  age: number | string;
  skill: string;
  city: string;
  resume: string;
}

/**
 * Public job application. Attached to the logged-in account when a session
 * cookie is present (optionalAuth), anonymous otherwise.
 */
const apply = (req: Request<{}, {}, HiringBody>, res: Response) => {
  const { name, email, age, skill, city, resume } = req.body ?? {};

  if (!name || !email || !age || !skill || !city || !resume) {
    return res.status(400).json({ err: "همه فیلدها الزامی هستند" });
  }
  if (Number.isNaN(Number(age)) || Number(age) < 1) {
    return res.status(400).json({ err: "سن واردشده معتبر نیست" });
  }

  try {
    hiringModel.create({
      userId: req.user?.id ?? null,
      name,
      email,
      age: Number(age),
      skill,
      city,
      resume,
    });
    return res
      .status(201)
      .json({ message: "درخواست شما با موفقیت ثبت شد" });
  } catch (err) {
    console.error("hiring/apply:", err);
    return res.status(500).json({ err: "خطای داخلی سرور" });
  }
};

const getAll = (_req: Request, res: Response) => {
  res.json(hiringModel.getAll());
};

export { apply, getAll };
