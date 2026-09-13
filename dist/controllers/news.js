import newsModel from "../models/news.js";
const getAll = async (res) => {
    const news = await newsModel.getAll();
    res.json(news);
};
const create = async (req, res) => {
    await newsModel.create(req.body);
    res.json("News created successfully :)");
};
const deleteNews = async (req, res) => {
    await newsModel.deleteNew(Number(req.params.id));
    res.json("News deleted successfully :)");
};
const getOne = async (req, res) => {
    const desiredNews = await newsModel.getOne(Number(req.params.id));
    res.json(desiredNews);
};
const publish = async (req, res) => {
    await newsModel.publish(Number(req.params.id));
    res.json("News updated successfully :)");
};
const getLatest = async (res) => {
    const latestNews = await newsModel.getLatest();
    res.json(latestNews);
};
//const update = async (req: Request, res: Response) => {}
export { getAll, create, deleteNews, getOne, publish, getLatest };
