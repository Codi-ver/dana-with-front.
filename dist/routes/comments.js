export {};
/*
import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";

import {
  getAll,
  sendMessage,
  getOne,
  answer,
  deleteComment,
} from "../controllers/comments.js";

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, getAll)
  .post(authMiddleware, sendMessage);
router
  .route("/:id")
  .get(authMiddleware, isAdminMiddleware, getOne)
  .post(authMiddleware, answer)
  .delete(authMiddleware, isAdminMiddleware, deleteComment);

export default router;
*/
