import express from "express";
import {
  validateCreateTask,
  validateGetTasks,
  validateUpdateTask,
  validateGetStudentTasks,
  validateDeleteTask,
} from "../middlewares/taskValidator.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStudentTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/create",
  validateCreateTask,
  authenticateToken,
  authorizeRole(["admin"]),
  createTask
);
router.get(
  "/student",
  validateGetStudentTasks,
  authenticateToken,
  authorizeRole(["student"]),
  getStudentTasks
);
router.get(
  "/:trackId",
  validateGetTasks,
  authenticateToken,
  authorizeRole(["admin"]),
  getTasks
);
router.put(
  "/update/:taskId",
  validateUpdateTask,
  authenticateToken,
  authorizeRole(["admin"]),
  updateTask
);
router.delete(
  "/delete/:taskId",
  validateDeleteTask,
  authenticateToken,
  authorizeRole(["admin"]),
  deleteTask
);

export default router;
