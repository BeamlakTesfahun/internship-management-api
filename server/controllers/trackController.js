import Track from "../models/trackModel.js";
import { StatusCodes } from "http-status-codes";

const createTrack = async (req, res) => {
  try {
    const { name, description, students, tasks } = req.body;

    const existingTrack = await Track.findOne({ name });
    if (existingTrack) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Track already exists",
      });
    }

    const newTrack = new Track({
      name,
      description,
      students,
      tasks,
    });
    await newTrack.save();

    res.status(StatusCodes.CREATED).json({
      msg: "Track created successfully",
      track: newTrack,
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();

    if (tracks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "No tracks found",
      });
    }

    res.status(StatusCodes.OK).json(tracks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

export { createTrack, getAllTracks };
