import { Resource } from "../models/Resourse.js";


export const createResource = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const resource = await Resource.create({ title, description, url });
    res.status(201).json({ message: "Resource created", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;

    const resource = await Resource.findByIdAndUpdate(
      id,
      { title, description, url },
      { new: true }
    );

    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource updated", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};