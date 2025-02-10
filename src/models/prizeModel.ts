import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema(
  {
    randomId: {
      type: Number,
      required: [true, "Please provide random number"],
      unique: true,
    },
    prize: {
      type: Number,
      required: [true, "Please provide prize"],
    },
  },
  { timestamps: true }
);

const Prize = mongoose.models.prize || mongoose.model("prize", prizeSchema);

export default Prize;
