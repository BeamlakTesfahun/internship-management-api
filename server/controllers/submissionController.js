import { StatusCodes } from "http-status-codes";
import Submission from "../models/submissionModel.js";
import Task from "../models/taskModel.js";

const submitTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { file, content, links } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const submission = new Submission({
      student: req.user.id,
      task: taskId,
      submissionDetails: {
        file,
        content,
        links,
      },
    });

    await submission.save();

    res.status(200).json({
      msg: "Task submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error occured:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// view submission details
const getSubmissionDetails = async (req, res) => {
  try {
    const { taskId } = req.params;
    const studentId = req.user.id;

    const submission = await Submission.findOne({
      task: taskId,
      student: studentId,
    }).populate("task");

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    res.status(200).json({
      msg: "Submission details",
      submission,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const provideFeedback = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { feedback } = req.body;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    submission.feedback = feedback;
    // submission.graded = true;

    await submission.save();

    res.status(200).json({
      msg: "Feedback submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const submissions = await Submission.find({ task: taskId }).populate(
      "student"
    );

    if (submissions.length === 0) {
      return res.status(404).json({ msg: "No submissions" });
    }

    res.status(200).json({
      msg: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export { submitTask, getSubmissionDetails, getAllSubmissions, provideFeedback };
