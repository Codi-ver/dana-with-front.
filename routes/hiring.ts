import express from "express";
import hiringController from "../controllers/hiring.js";

const router = express.Router();
router.route("/fill").post(hiringController);

export default router;
