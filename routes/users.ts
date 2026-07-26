/*import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import isAdminMiddleware from "../middlewares/isAdmin.js";
import { getAll, deleteUser, updateUser, getOne } from "../controllers/users.js";

router.route("/").get(authMiddleware, isAdminMiddleware, getAll);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, deleteUser)
  .put(authMiddleware, updateUser)
  .get(authMiddleware, isAdminMiddleware, getOne);

export default router;
*/
