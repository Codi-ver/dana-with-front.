import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import hiringController from "../controllers/hiring.js";
router.route("/fill").post(authMiddleware, hiringController);
export default router;
