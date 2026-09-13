import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import {
  getAll,
  deleteUser,
  //updateUser,
  findByEmail,
  findByPhone,
  findByIdentifier,
  getOne,
} from "../controllers/users.js";

router.route("/").get(authMiddleware, isAdminMiddleware, getAll);

router.route("/email").post(findByEmail);
router.route("/phone").post(findByPhone);
router.route("/identifier").post(findByIdentifier);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, deleteUser)
  //.put(authMiddleware, updateUser)
  .get(authMiddleware, isAdminMiddleware, getOne);

export default router;
