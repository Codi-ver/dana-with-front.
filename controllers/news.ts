import type { Request, Response } from "express";
import newsModel from "../models/news.js";

/** Prefixed image path so clients can build a full URL from the API origin. */
const serialize = (row: any) =>
  row ? { ...row, image: row.image ? `/uploads/${row.image}` : null } : row;

const getAll = (req: Request, res: Response) => {
  const isAdmin = req.user?.role === "ADMIN";
  const includeDrafts = isAdmin && req.query.all === "1";
  res.json(newsModel.getAll(!includeDrafts).map(serialize));
};

const latest = (_req: Request, res: Response) => {
  res.json(newsModel.getLatest(3).map(serialize));
};

const getOne = (req: Request<{ id: string }>, res: Response) => {
  const news = newsModel.getOne(Number(req.params.id));
  if (!news) {
    return res.status(404).json({ err: "خبر یافت نشد" });
  }
  return res.json(serialize(news));
};

const create = (req: Request, res: Response) => {
  const { title, event } = req.body ?? {};
  if (!title || !event) {
    return res.status(400).json({ err: "عنوان و متن خبر الزامی است" });
  }
  // requireAuth guarantees req.user
  const result = newsModel.create({
    title,
    event,
    image: req.file?.filename ?? null,
    authorId: req.user!.id,
  });
  return res
    .status(201)
    .json({ message: "خبر با موفقیت منتشر شد", id: Number(result.lastInsertRowid) });
};

const publish = (req: Request<{ id: string }>, res: Response) => {
  const result = newsModel.publish(Number(req.params.id));
  if (result.changes === 0) {
    return res.status(404).json({ err: "خبر یافت نشد" });
  }
  return res.json({ message: "خبر منتشر شد" });
};

const deleteNews = (req: Request<{ id: string }>, res: Response) => {
  const result = newsModel.deleteNew(Number(req.params.id));
  if (result.changes === 0) {
    return res.status(404).json({ err: "خبر یافت نشد" });
  }
  return res.json({ message: "خبر حذف شد" });
};

export { getAll, latest, getOne, create, publish, deleteNews };
