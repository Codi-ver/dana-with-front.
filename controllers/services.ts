import type { Request, Response } from "express";
import servicesModel from "../models/services.js";

const serialize = (row: any) =>
  row ? { ...row, image: row.image ? `/uploads/${row.image}` : null } : row;

const getAll = (_req: Request, res: Response) => {
  res.json(servicesModel.getAll().map(serialize));
};

const getOne = (req: Request<{ id: string }>, res: Response) => {
  const service = servicesModel.getOne(Number(req.params.id));
  if (!service) {
    return res.status(404).json({ err: "محصول یافت نشد" });
  }
  return res.json(serialize(service));
};

const create = (req: Request, res: Response) => {
  const { name, description } = req.body ?? {};
  if (!name || !description) {
    return res.status(400).json({ err: "نام و توضیحات محصول الزامی است" });
  }
  const result = servicesModel.create({
    name,
    description,
    creatorId: req.user!.id, // requireAuth guarantees req.user
    image: req.file?.filename ?? "placeholder.svg",
  });
  return res
    .status(201)
    .json({ message: "محصول با موفقیت ثبت شد", id: Number(result.lastInsertRowid) });
};

const deleteService = (req: Request<{ id: string }>, res: Response) => {
  const result = servicesModel.remove(Number(req.params.id));
  if (result.changes === 0) {
    return res.status(404).json({ err: "محصول یافت نشد" });
  }
  return res.json({ message: "محصول حذف شد" });
};

export { getAll, getOne, create, deleteService };
