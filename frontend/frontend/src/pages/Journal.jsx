


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { journalAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import SectionHeader from "../components/SectionHeader";
import "react-toastify/dist/ReactToastify.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
    } else {
      fetchEntries();
    }
  }, [user, navigate]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await journalAPI.getEntries();
      setEntries(res.data);
    } catch {
      toast.error("Failed to load journal entries");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Please write something!");
      return;
    }

    try {
      setLoading(true);
      const entryData = { title: title || "Untitled", content };
      const res = await journalAPI.createEntry(entryData);
      setEntries([res.data.journal, ...entries]);
      setTitle("");
      setContent("");
      toast.success("Entry saved!");
    } catch {
      toast.error("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      await journalAPI.deleteEntry(id);
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      toast.success("Entry deleted!");
    } catch {
      toast.error("Failed to delete entry");
    }
  };

  return (
    <div className="journal-page">
      <ToastContainer />
      <SectionHeader
        title="Your Personal Journal"
        subtitle="Write, reflect, and track your thoughts."
        align="center"
      />

      {/* Input card - style intact */}
      <div className="card hover-card journal-input-card shadow-lg mb-5">
        <div className="card-body">
          <h5 className="card-title text-white">Write Your Thoughts</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Entry title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control journal-textarea mb-3"
            placeholder="What's on your mind today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          ></textarea>
          <button
            className="btn btn-info"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </div>

      <h3 className="text-center journal-subtitle mb-4">Your Journal Entries</h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-info" role="status"></div>
        </div>
      ) : entries.length === 0 ? (
        <p className="text-muted text-center">No entries yet.</p>
      ) : (
        <div className="entries-container">
          {entries.map((entry, index) => (
            <div
              key={entry._id || index}
              className="card hover-card journal-entry-card shadow-sm mb-3"
            >
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-info">{entry.title}</h6>
                  <small>{new Date(entry.date).toLocaleDateString()}</small>
                  <p className="mt-2 mb-0">{entry.content}</p>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(entry._id, index)}
                >
                  <MdDelete size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;