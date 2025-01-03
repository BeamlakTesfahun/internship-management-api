import { check, validationResult } from "express-validator";

const validateCreateTask = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  check("deadline")
    .notEmpty()
    .isISO8601()
    .withMessage("Deadline must be a valid date in ISO8601 format"),
  check("trackId")
    .notEmpty()
    .isMongoId()
    .withMessage("Track ID must be a valid MongoDB ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateTask = [
  (req, res, next) => {
    const { title, description, deadline, trackId } = req.body;
    if (!title && !description && !deadline && !trackId) {
      return res
        .status(400)
        .json({ msg: "At least one field is required to update the task" });
    }
    next();
  },
  check("title").optional().isString().withMessage("Title must be a string"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  check("deadline")
    .optional()
    .isISO8601()
    .withMessage("Deadline must be a valid date in ISO8601 format"),
  check("trackId")
    .optional()
    .isMongoId()
    .withMessage("Track ID must be a valid MongoDB ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateGetTask = [
  check("taskId")
    .notEmpty()
    .isMongoId()
    .withMessage("Task ID must be a valid MongoDB ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateGetTasks = [
  check("trackId")
    .notEmpty()
    .isMongoId()
    .withMessage("Track ID must be a valid MongoDB ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateDeleteTask = [
  check("taskId")
    .notEmpty()
    .isMongoId()
    .withMessage("Task ID must be a valid MongoDB ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// const validateGetStudentTasks = [
//   check("userId")
//     .notEmpty()
//     .isMongoId()
//     .withMessage("User ID must be a valid MongoDB ID"),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

export {
  validateCreateTask,
  validateUpdateTask,
  validateGetTask,
  validateGetTasks,
  validateDeleteTask,
  // validateGetStudentTasks,
};
