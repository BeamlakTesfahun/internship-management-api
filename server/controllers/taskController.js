import { StatusCodes } from "http-status-codes";
import Track from "../models/trackModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const createTask = async (req, res) => {
  try {
    const { title, description, deadline, createdBy, trackId } = req.body;

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Track not found",
      });
    }

    const newTask = new Task({
      title,
      description,
      deadline,
      track: trackId,
      createdBy,
    });

    await newTask.save();

    track.tasks.push(newTask._id);
    await track.save();

    res.status(StatusCodes.CREATED).json({
      msg: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

// get tasks within a track
const getTasks = async (req, res) => {
  try {
    const { trackId } = req.params;

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Track not found",
      });
    }

    // get all tasks associated to this track
    const tasks = await Task.find({ track: trackId });

    res.status(StatusCodes.OK).json({
      msg: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, deadline, track } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Task not found",
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.track = track || task.track;

    await task.save();

    res.status(StatusCodes.OK).json({
      msg: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Task not found",
      });
    }

    await Task.deleteOne({ _id: taskId });

    res.status(StatusCodes.OK).json({
      msg: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

// get student tasks
const getStudentTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    const student = await User.findById(userId).populate("track");

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    const track = student.track;

    const tasks = await Task.find({ track: track._id });

    res.status(200).json({
      msg: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks for student:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// get task by id
const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Task not found",
      });
    }

    res.status(StatusCodes.OK).json({
      msg: "Task fetched successfully",
      task,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};
export {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getStudentTasks,
};
