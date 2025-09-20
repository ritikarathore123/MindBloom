
import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: "Untitled Entry"
  },
  content: {
    type: String,
    required: [true, "Journal content is required"],
    trim: true,
    minlength: [10, "Journal content must be at least 10 characters long"],
    maxlength: [1000, "Journal content cannot exceed 1000 characters"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, 
{ timestamps: true });

export const Journal = mongoose.model("Journal", journalSchema);