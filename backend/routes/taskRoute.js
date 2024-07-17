import express from "express";
import { isAuthenticated } from "../utils/auth.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  updateTask,
} from "../controllers/taskControlles.js";

const router = express.Router();

router.route("/task/new").post(isAuthenticated, createTask);
router.route("/tasks").get(isAuthenticated, getAllTask);
router
  .route("/tasks/:id")
  .get(isAuthenticated, getSingleTask)
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
