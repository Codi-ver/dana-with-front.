import express from "express";
const router = express.Router();
import requireAuth from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import { getAll, deleteUser, getOne } from "../controllers/users.js";

// All user management endpoints are admin-only.
router.get("/", requireAuth, isAdminMiddleware, getAll);
router
  .route("/:id")
  .get(requireAuth, isAdminMiddleware, getOne)
  .delete(requireAuth, isAdminMiddleware, deleteUser);

export default router;
