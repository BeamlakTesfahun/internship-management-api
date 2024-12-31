import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import {
  validateAdminRegistration,
  validateInviteUser,
  validateAccountSetup,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  handleValidationErrors,
} from "../middlewares/authValidator.js";
import {
  login,
  inviteUser,
  setupAccount,
  forgotPassword,
  resetPassword,
  createAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register-admin",
  validateAdminRegistration,
  handleValidationErrors,
  createAdmin
);

router.post(
  "/invite-user",
  validateInviteUser,
  handleValidationErrors,
  authenticateToken,
  authorizeRole(["admin"]),
  inviteUser
);

router.post("/login", validateLogin, handleValidationErrors, login);

router.post(
  "/setup-account/:inviteToken",
  validateAccountSetup,
  handleValidationErrors,
  setupAccount
);

router.post(
  "/forgot-password",
  validateForgotPassword,
  handleValidationErrors,
  forgotPassword
);
router.post(
  "/reset-password/:resetToken",
  validateResetPassword,
  handleValidationErrors,
  resetPassword
);

export default router;
