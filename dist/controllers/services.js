import servicesModel from "../models/services.js";
const getAll = async (res) => {
    const services = await servicesModel.getAll();
    res.json(services);
};
const create = async (req, res) => {
    await servicesModel.create(req.body);
    res.json("Service created successfully :)");
};
const deleteService = async (req, res) => {
    await servicesModel.remove(Number(req.params.id));
    res.json("Service deleted successfully :)");
};
const getOne = async (req, res) => {
    const service = await servicesModel.getOne(Number(req.params.id));
    res.json(service);
};
export { getAll, create, deleteService, getOne };
