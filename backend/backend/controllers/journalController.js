import { Journal } from "../models/Journal.js";
import { User } from "../models/User.js";


export const createJournal = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const userId = req.user?.id; // Get user ID from authenticated token

    if (!content) return res.status(400).json({ message: "Content is required" });
    if (!userId) return res.status(401).json({ message: "User authentication required" });

    // Create new journal entry
    const journal = new Journal({
      title: title || "Untitled Entry",
      content,
      date: date || new Date(),
      userId 
    });

    const saved = await journal.save();
    
    // Update user's journals array
    await User.findByIdAndUpdate(userId, { $push: { journals: saved._id } });
    
    res.status(201).json({ message: "Journal entry created successfully", journal: saved });
  } catch (err) {
    console.error("Error creating journal:", err);
    res.status(500).json({ message: "Failed to save journal entry" });
  }
};

export const getJournals = async (req, res) => {
  try {
    const userId = req.user?.id; // Get user ID from authenticated token
    
    if (!userId) return res.status(401).json({ message: "User authentication required" });

    // Get journals directly by userId (more reliable)
    const journals = await Journal.find({ userId: userId }).sort({ date: -1 });
    
    // Also update user's journals array to keep it in sync
    const journalIds = journals.map(journal => journal._id);
    await User.findByIdAndUpdate(userId, { 
      $set: { journals: journalIds } 
    });
    
    res.json(journals);
  } catch (error) {
    console.error("Error fetching journals:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "User authentication required" });

    const journal = await Journal.findOneAndUpdate(
      { _id: id, userId: userId },
      {
        title: title || "Untitled Entry",
        content,
        date: date || new Date(),
      },
      { new: true }
    );

    if (!journal) return res.status(404).json({ message: "Journal not found" });

    res.json({ message: "Journal updated successfully", journal });
  } catch (error) {
    console.error("Error updating journal:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "User authentication required" });

    const journal = await Journal.findOneAndDelete({ _id: id, userId: userId });

    if (!journal) return res.status(404).json({ message: "Journal not found" });

    // Remove journal from user's journals array
    await User.findByIdAndUpdate(userId, { $pull: { journals: journal._id } });

    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.error("Error deleting journal:", error);
    res.status(500).json({ message: "Server error" });
  }
};
