

import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { musicAPI } from "../services/api";

function MusicPage() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await musicAPI.getTracks();
        setMusic(res.data);
      } catch (err) {
        console.error("Failed to load music:", err);
        alert("Failed to load music tracks");
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Loading music...</h3>;
  if (music.length === 0) return <h3 className="text-center mt-5">No music available</h3>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Relaxing Music Collection</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {music.map((track) => (
          <div
            key={track._id}
            className="card p-2"
            style={{ width: "300px", backgroundColor: "#222", color: "white" }}
          >
            {/* Music Image */}
            <img
              src="https://res.cloudinary.com/dmdlgpurh/image/upload/v1736843317/music-bg_wpizsb.jpg"
              alt={track.title}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "5px" }}
            />
            <div className="p-2">
              <h5>{track.title}</h5>
              <AudioPlayer
                src={track.mediaUrl}
                volume={0.5}
                style={{ backgroundColor: "#333", borderRadius: "5px" }}
                showJumpControls={false}
                customAdditionalControls={[]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicPage;