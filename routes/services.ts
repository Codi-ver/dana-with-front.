import express from "express";
const router = express.Router();
import requireAuth from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import upload from "../utils/uploader.js";
import { getAll, create, deleteService, getOne } from "../controllers/services.js";

router.get("/", getAll);
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
  .delete(requireAuth, isAdminMiddleware, deleteService);

export default router;
