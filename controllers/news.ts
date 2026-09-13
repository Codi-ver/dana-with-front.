import { Request, Response } from "express";
import newsModel from "../models/news.js";
const getAll = async (res: Response) => {
  const news = await newsModel.getAll();
  res.json(news);
};
const create = async (req: Request, res: Response) => {
  await newsModel.create(req.body);
  res.json("News created successfully :)");
};
const deleteNews = async (req: Request, res: Response) => {
  await newsModel.deleteNew(Number(req.params.id));
  res.json("News deleted successfully :)");
};
const getOne = async (req: Request, res: Response) => {
  const desiredNews = await newsModel.getOne(Number(req.params.id));
  res.json(desiredNews);
};
const publish = async (req: Request, res: Response) => {
  await newsModel.publish(Number(req.params.id));
  res.json("News updated successfully :)");
};
const getLatest = async (res: Response) => {
  const latestNews = await newsModel.getLatest();
  res.json(latestNews);
};

//const update = async (req: Request, res: Response) => {}

export { getAll, create, deleteNews, getOne, publish, getLatest };
