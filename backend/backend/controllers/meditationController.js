import { Meditation } from "../models/Meditation.js";


export const createMeditation = async (req, res) => {
  console.log(error);
    console.log("hye how ");
  try {
    const { title, author, image, video, preview } = req.body;

    const meditation = await Meditation.create({
      title,
      author,
      image,
      video,
      preview
  
    });

    res.status(201).json({ message: "Meditation created", meditation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find();
    res.json(meditations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getMeditationById = async (req, res) => {
  try {
    const meditation = await Meditation.findById(req.params.id);
    if (!meditation) return res.status(404).json({ message: "Meditation not found" });
    res.json(meditation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMeditation = async (req, res) => {
  try {
    const meditation = await Meditation.findByIdAndDelete(req.params.id);
    if (!meditation) return res.status(404).json({ message: "Meditation not found" });

    res.json({ message: "Meditation deleted successfully", meditation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};