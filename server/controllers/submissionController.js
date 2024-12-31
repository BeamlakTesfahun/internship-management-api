import { StatusCodes } from "http-status-codes";
import Submission from "../models/submissionModel.js";
import Task from "../models/taskModel.js";

const submitTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { content, links } = req.body;

    const file = req.file;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Task not found" });
    }

    let parsedLinks = [];
    if (links) {
      try {
        parsedLinks = JSON.parse(links);
      } catch (err) {
        parsedLinks = [links];
      }
    }

    const submissionDetails = {
      content,
      links: parsedLinks,
    };

    if (file) {
      submissionDetails.file = file.path;
    }

    const submission = new Submission({
      student: req.user.userId,
      task: taskId,
      submissionDetails,
    });

    await submission.save();

    res.status(StatusCodes.OK).json({
      msg: "Task submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

// view submission details
const getSubmissionDetails = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const studentId = req.user.userId;

    // console.log("sub id", submissionId);
    // console.log("stud id", studentId);

    const submission = await Submission.findOne({
      _id: submissionId,
      student: studentId,
    });

    if (!submission) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Submission not found" });
    }

    res.status(StatusCodes.OK).json({
      msg: "Submission details",
      submission,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const provideFeedback = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { feedback, status } = req.body;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Submission not found" });
    }

    submission.feedback = feedback;
    submission.status = status;
    // submission.graded = true;

    await submission.save();

    res.status(StatusCodes.OK).json({
      msg: "Feedback submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Task not found" });
    }

    const submissions = await Submission.find({ task: taskId }).populate(
      "student"
    );

    if (submissions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "No submissions" });
    }

    res.status(StatusCodes.OK).json({
      msg: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export { submitTask, getSubmissionDetails, getAllSubmissions, provideFeedback };
