import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import {
  getAll,
  create,
  deleteNews,
  latest,
  getOne,
  publish,
} from "../controllers/news.js";

router.route("/latest").get(latest);

router.route("/").get(getAll).post(authMiddleware, isAdminMiddleware, create);

router.route("/publish").get(authMiddleware, isAdminMiddleware, publish);
router
  .route("/:id")
  .get(getOne)
  .delete(authMiddleware, isAdminMiddleware, deleteNews);

export default router;
