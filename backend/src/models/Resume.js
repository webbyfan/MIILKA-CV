import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    atsScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
