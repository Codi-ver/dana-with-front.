import commentModel from "../models/comments.js";
const getAll = async (res) => {
    const coments = await commentModel.allComments();
    res.json(coments);
};
const createComment = async (req, res) => {
    await commentModel.createComment(req.body);
    res.json("New comment added successfully :) ");
};
const getOne = async (req, res) => {
    const comment = await commentModel.findById(Number(req.params.id));
    res.json(comment);
};
const answer = async (req, res) => {
    await commentModel.answerToComment(Number(req.params.id), req.body.answer);
    res.json("Answer added successfully :)");
};
const deleteComment = async (req, res) => {
    await commentModel.removeComment(Number(req.params.id));
    res.json("Comment removed successfully :)");
};
export { getAll, createComment, getOne, answer, deleteComment };
