import express from "express";
import {
  getAllSubmissions,
  getSubmissionDetails,
  submitTask,
  provideFeedback,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/submit/:taskId", submitTask);
router.get("/details/:taskId", getSubmissionDetails);
router.post("/feedback/:submissionId", provideFeedback);
router.get("/all/:taskId", getAllSubmissions);

export default router;
