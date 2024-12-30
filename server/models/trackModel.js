import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Track", trackSchema);
