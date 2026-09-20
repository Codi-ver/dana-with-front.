import express from "express";
const router = express.Router();
import { apply, getAll } from "../controllers/hiring.js";
import requireAuth from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";

router.post("/apply", apply);
router.get("/", requireAuth, isAdminMiddleware, getAll);

export default router;
