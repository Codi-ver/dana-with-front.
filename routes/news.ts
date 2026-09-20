import express from "express";
const router = express.Router();
import requireAuth, { optionalAuth } from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import upload from "../utils/uploader.js";
import {
  getAll,
  create,
  deleteNews,
  latest,
  getOne,
  publish,
} from "../controllers/news.js";

router.get("/latest", latest);
router.get("/", optionalAuth, getAll);
router.post(
  "/",
  requireAuth,
  isAdminMiddleware,
  upload.single("image"),
  create,
);

router
  .route("/:id")
  .get(getOne)
  .delete(requireAuth, isAdminMiddleware, deleteNews);
router.put("/:id/publish", requireAuth, isAdminMiddleware, publish);

export default router;
