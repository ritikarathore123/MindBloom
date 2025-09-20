
import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Music title is required"],
    trim: true,
    minlength: [2, "Title must be at least 2 characters long"]
  },
  
  mediaUrl: {
    type: String,
    required: [true, "Audio URL is required"],
    match: [/^https?:\/\/.+/, "Invalid audio URL format"]
  },
  
}, { timestamps: true });

export const Music = mongoose.model("Music", musicSchema);


