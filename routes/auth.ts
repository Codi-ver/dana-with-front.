import express from "express";
const router = express.Router();
import { register, login, logout, me } from "../controllers/auth.js";
import { requireAuth } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
