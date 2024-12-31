import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import upload from "../config/multer.js";
import {
  validateSubmitTask,
  validateGetAllSubmissions,
  validateGetSubmissionDetails,
  validateProvideFeedback,
  validate,
} from "../middlewares/submissionValidator.js";
import {
  getAllSubmissions,
  getSubmissionDetails,
  submitTask,
  provideFeedback,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post(
  "/submit-task/:taskId",
  upload.single("file"),
  validate(validateSubmitTask),
  authenticateToken,
  authorizeRole(["student"]),
  submitTask
);
router.get(
  "/details/:submissionId",
  validate(validateGetSubmissionDetails),
  authenticateToken,
  getSubmissionDetails
);
router.post(
  "/feedback/:submissionId",
  validate(validateProvideFeedback),
  authenticateToken,
  authorizeRole(["admin"]),
  provideFeedback
);
router.get(
  "/all/:taskId",
  validate(validateGetAllSubmissions),
  authenticateToken,
  authorizeRole(["admin"]),
  getAllSubmissions
);

export default router;
