

import { Music } from "../models/Music.js";

// Create new music (only title & mediaUrl)
export const createMusic = async (req, res) => {
  try {
    const { title, mediaUrl } = req.body;

    const newMusic = await Music.create({
      title,
      mediaUrl
    });

    res.status(201).json({ message: "Music track created", music: newMusic });
  } catch (error) {
    console.error("Error creating music:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all music tracks (only title & mediaUrl)
export const getMusicList = async (req, res) => {
  try {
    const music = await Music.find({}, "title mediaUrl"); // sirf title & mediaUrl
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get music by id (only title & mediaUrl)
export const getMusicById = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id, "title mediaUrl"); // sirf title & mediaUrl
    if (!music) return res.status(404).json({ message: "Music not found" });
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete music by id
export const deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndDelete(req.params.id);
    if (!music) return res.status(404).json({ message: "Music not found" });

    res.json({ message: "Music track deleted successfully", music });
  } catch (error) {
    console.error("Error deleting music:", error);
    res.status(500).json({ message: "Server error" });
  }
}