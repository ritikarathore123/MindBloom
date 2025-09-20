

import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Exercise title is required"], 
    trim: true,
    minlength: [3, "Exercise title must be at least 3 characters long"],
    maxlength: [100, "Exercise title cannot exceed 100 characters"]
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  videoUrl: { 
    type: String,
    trim: true,
    
  },
  duration: {  
    type: Number,
    min: [1, "Duration must be at least 1 minute"],
    max: [300, "Duration cannot be more than 300 minutes"]
  }
}, { timestamps: true });

export const Exercise = mongoose.model("Exercise", exerciseSchema);