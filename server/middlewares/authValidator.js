import { check, validationResult } from "express-validator";

// email validation
const emailValidation = check("email")
  .isEmail()
  .withMessage("A valid email is required");

// password validation
const passwordValidation = check("password")
  .notEmpty()
  .withMessage("Password is required")
  .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
  .withMessage(
    "Password must contain at least 1 digit, 1 special character, 1 letter, and must be at least 8 characters long"
  );

// validation for admin
export const validateAdminRegistration = [
  emailValidation,
  passwordValidation,
  check("name").notEmpty().withMessage("Name is required"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

// validation for inviting students
export const validateInviteUser = [
  emailValidation,
  // check("role").notEmpty().withMessage("Role is required"),
];

// validation for setup account controller
export const validateAccountSetup = [
  passwordValidation,
  check("name").notEmpty().withMessage("Name is required"),
];

// login
export const validateLogin = [emailValidation, passwordValidation];

// validation for forgot password
export const validateForgotPassword = [emailValidation];

// validation for reset password
export const validateResetPassword = [
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must contain at least 1 digit, 1 special character, 1 letter, and must be at least 8 characters long"
    ),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

// middleware to handle validation result errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
