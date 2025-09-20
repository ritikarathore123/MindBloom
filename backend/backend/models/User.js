
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  journals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Journal" }],
  scores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Score" }]
},
{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);