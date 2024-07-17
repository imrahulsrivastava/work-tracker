import express from "express";
import {
  getAllUser,
  getUserProfile,
  updatePassword,
} from "../controllers/userControllers.js";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  register,
  resetPassword,
} from "../controllers/authControllers.js";
import { isAuthenticated } from "../utils/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(loginUser);

router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/update").post(isAuthenticated, updatePassword);
router.route("/password/reset/:token").post(resetPassword);

// admin routes

router.route("/admin/users").get(getAllUser);
router.route("/admin/getuser/:id").post(getUserProfile);

export default router;
