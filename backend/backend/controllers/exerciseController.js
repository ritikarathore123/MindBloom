// import { Exercise } from "../models/Exercise.js";


// export const createExercise = async (req, res) => {
//   try {
//     const { title, description, videoUrl, duration } = req.body;

//     const exercise = await Exercise.create({
//       title,
//       description,
//       videoUrl,
//       duration,
//     });

//     res.status(201).json({ message: "Exercise created", exercise });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const getAllExercises = async (req, res) => {
//   try {
//     const exercises = await Exercise.find();
//     res.json(exercises);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getExerciseById = async (req, res) => {
//   try {
//     const exercise = await Exercise.findById(req.params.id);
//     if (!exercise) return res.status(404).json({ message: "Exercise not found" });
//     res.json(exercise);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// // Add multiple exercises at once
// export const createMultipleExercises = async (req, res) => {
//   try {
//     const exercises = req.body.exercises; // array of exercises

//     if (!Array.isArray(exercises) || exercises.length === 0) {
//       return res.status(400).json({ message: "Please provide an array of exercises" });
//     }

//     const newExercises = await Exercise.insertMany(exercises);
//     res.status(201).json({ message: "Multiple exercises created", exercises: newExercises });
//   } catch (error) {
//     console.error("Error creating multiple exercises:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const updateExercise = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, videoUrl, duration } = req.body;

//     const exercise = await Exercise.findByIdAndUpdate(
//       id,
//       { title, description, videoUrl, duration },
//       { new: true }
//     );

//     if (!exercise) return res.status(404).json({ message: "Exercise not found" });

//     res.json({ message: "Exercise updated", exercise });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteExercise = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const exercise = await Exercise.findByIdAndDelete(id);

//     if (!exercise) return res.status(404).json({ message: "Exercise not found" });

//     res.json({ message: "Exercise deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


import { Exercise } from "../models/Exercise.js";

// Single Exercise Create
export const createExercise = async (req, res) => {
  try {
    const { title, description, videoUrl, duration } = req.body;

    const exercise = await Exercise.create({
      title,
      description,
      videoUrl,
      duration,
    });

    res.status(201).json({ message: "Exercise created", exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Bulk Create (multiple exercises)
export const createMultipleExercises = async (req, res) => {
  try {
    // Accept either direct array or { exercises: [...] }
    const exercises = Array.isArray(req.body)
      ? req.body
      : req.body.exercises;

    if (!exercises || exercises.length === 0) {
      return res.status(400).json({ message: "Provide an array of exercises" });
    }

    const newExercises = await Exercise.insertMany(exercises);
    res.status(201).json({ message: "Multiple exercises created", exercises: newExercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Exercises
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Exercise by ID
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Exercise
export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, videoUrl, duration } = req.body;

    const exercise = await Exercise.findByIdAndUpdate(
      id,
      { title, description, videoUrl, duration },
      { new: true }
    );

    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    res.json({ message: "Exercise updated", exercise });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Exercise
export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findByIdAndDelete(id);

    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    res.json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};