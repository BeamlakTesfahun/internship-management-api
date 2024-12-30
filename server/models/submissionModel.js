import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submissionDetails: {
      file: { type: String },
      content: { type: String },
      links: [{ type: String }],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    feedback: { type: String },
    //   grade: { type: Number, min: 0, max: 100 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Submission", submissionSchema);
