import servicesModel from "../models/services.js";
import { Request, Response } from "express";
const getAll = async (res: Response) => {
  const services = await servicesModel.getAll();
  res.json(services);
};
const create = async (req: Request, res: Response) => {
  await servicesModel.create(req.body);
  res.json("Service created successfully :)");
};
const deleteService = async (req: Request, res: Response) => {
  await servicesModel.remove(Number(req.params.id));
  res.json("Service deleted successfully :)");
};
const getOne = async (req: Request, res: Response) => {
  const service = await servicesModel.getOne(Number(req.params.id));
  res.json(service);
};

export { getAll, create, deleteService, getOne };
