export {};
/*
import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import {
  getAll,
  create,
  deleteNew,
  updateNew,
  getOne,
  publish,
} from "../controllers/news.js";

router
  .route("/")
  .get(authMiddleware, getAll)
  .post(authMiddleware, isAdminMiddleware, create);
router
  .route("/:id")
  .get(authMiddleware, getOne)
  .put(authMiddleware, isAdminMiddleware, updateNew)
  .delete(authMiddleware, isAdminMiddleware, deleteNew);

router.route("/publish").get(authMiddleware, isAdminMiddleware, publish);

export default router;
*/
