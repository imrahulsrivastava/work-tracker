import express from "express";
import { getAllUser, getUserProfile } from "../controllers/userControllers.js";
import { forgotPassword, loginUser, register, resetPassword } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

// admin routes

router.route("/admin/users").get(getAllUser);
router.route("/admin/getuser/:id").post(getUserProfile);

export default router;
