import express from "express";

import { isAuthenticated } from "../utils/auth.js";
import {
  getAllUser,
  getUserProfile,
  updatePassword,
} from "../controllers/userController.js";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  register,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// User routes
router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);
router.route("/profile").get(isAuthenticated, getUserProfile);

router.route("/password/forgot").put(forgotPassword);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/password/reset/:token").put(resetPassword);

// Admin routes
router.route("/admin/users").get(getAllUser);
router.route("/admin/getuser/:id").post(getUserProfile);

export default router;
