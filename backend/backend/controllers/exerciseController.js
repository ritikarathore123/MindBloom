import { Exercise } from "../models/Exercise.js";


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
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


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