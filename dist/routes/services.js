import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import { getAll, create, deleteService, 
//updateService,
getOne, } from "../controllers/services.js";
router
    .route("/")
    .get(authMiddleware, isAdminMiddleware, getAll)
    .post(authMiddleware, isAdminMiddleware, create);
router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, deleteService)
    //.put(authMiddleware, isAdminMiddleware, updateService)
    .get(authMiddleware, isAdminMiddleware, getOne);
export default router;
