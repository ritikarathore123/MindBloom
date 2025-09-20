
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], 
    trim: true, 
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title must be less than 100 characters"]
  },
  description: {
    type: String,
    maxlength: [500, "Description can't exceed 500 characters"]
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    match: [/^https?:\/\/.+/, "Please enter a valid URL"]
  }
}, { timestamps: true });

export const Resource = mongoose.model("Resource", resourceSchema);