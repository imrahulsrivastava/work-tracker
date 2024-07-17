import express from "express";
import { getAllUser, getUserProfile } from "../controllers/userControllers.js";
import { loginUser, register } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(loginUser);

// admin routes

router.route("/admin/users").get(getAllUser);
router.route("/admin/getuser/:id").post(getUserProfile);

export default router;
