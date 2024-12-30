import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "student"], default: "student" },
    track: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isActive: { type: Boolean, default: false },
    inviteToken: { type: String },
    inviteTokenExpires: { type: Date },
  },
  { timestamps: true }
);

// hassh password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

export default mongoose.model("User", userSchema);
