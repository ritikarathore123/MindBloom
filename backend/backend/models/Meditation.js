



// import mongoose from "mongoose";

// const meditationSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       minlength: [3, "Title must be at least 3 characters long"],
//       maxlength: [100, "Title must be less than 100 characters"],
//     },
//     author: {
//       type: String,
//       trim: true,
//       maxlength: [100, "Author must be less than 100 characters"],
//       default: "",
//     },
//     image: {
//       type: String,
//       trim: true,
//       match: [/^https?:\/\/.+/, "Please enter a valid image URL"],
//       default: "",
//     },
//     video: {
//       type: String,
//       required: [true, "Video URL is required"],
//       trim: true,
//       match: [/^https?:\/\/.+/, "Please enter a valid video URL"],
//     },
//     preview: {
//       type: String,
//       trim: true,
//       match: [/^https?:\/\/.+/, "Please enter a valid preview URL"],
//       default: "",
//     },
//     description: {
//       type: String,
//       trim: true,
//       maxlength: [500, "Description must be less than 500 characters"],
//       default: "",
//     },
//     duration: {
//       type: Number,
//       min: [0, "Duration must be a positive number"],
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// export const Meditation = mongoose.model("Meditation", meditationSchema);





import mongoose from "mongoose";

const meditationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters"],
    },
    author: {
      type: String,
      trim: true,
      maxlength: [100, "Author must be less than 100 characters"],
      default: "",
    },
    image: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid image URL"],
      default: "",
    },
    video: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid video URL"],
    },
    preview: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid preview URL"],
      default: "",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description must be less than 500 characters"],
      default: "",
    },
    duration: {
      type: Number,
      min: [0, "Duration must be a positive number"],
      default: 0,
    },
  },
  { timestamps: true }
);

export const Meditation = mongoose.model("Meditation", meditationSchema);