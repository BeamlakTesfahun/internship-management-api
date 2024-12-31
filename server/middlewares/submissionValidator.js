import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  };
};

// validator for submitting task
const validateSubmitTask = [
  param("taskId").isMongoId().withMessage("Invalid task ID"),
  body("content").optional().isString().withMessage("Content must be a string"),
  // body("links")
  //   .optional()
  //   .isArray()
  //   .withMessage("Links must be an array of strings"),
  body("links.*").optional().isURL().withMessage("Invalid URL format"),
];

// validator for submission details
const validateGetSubmissionDetails = [
  param("submissionId").isMongoId().withMessage("Invalid submission ID"),
];

// validator for providing feedback
const validateProvideFeedback = [
  param("submissionId").isMongoId().withMessage("Invalid submission ID"),
  body("feedback")
    .isString()
    .withMessage("Feedback must be a string")
    .notEmpty()
    .withMessage("Feedback cannot be empty"),
];

// for all submissions
const validateGetAllSubmissions = [
  param("taskId").isMongoId().withMessage("Invalid task ID"),
];

export {
  validate,
  validateSubmitTask,
  validateGetSubmissionDetails,
  validateProvideFeedback,
  validateGetAllSubmissions,
};
