import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import {
  validateTrack,
  handleValidationErrors,
} from "../middlewares/trackValidator.js";
import { createTrack, getAllTracks } from "../controllers/trackController.js";

const router = express.Router();

router.post(
  "/create",
  validateTrack,
  handleValidationErrors,
  authenticateToken,
  authorizeRole(["admin"]),
  createTrack
);

router.get("/", authenticateToken, getAllTracks);

export default router;
