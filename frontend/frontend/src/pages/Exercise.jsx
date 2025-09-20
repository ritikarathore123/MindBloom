


import React, { useState, useEffect } from "react";
import { exerciseAPI } from "../services/api";

const ExerciseCard = ({ exercise }) => (
  <div className="card mb-4 shadow-sm hover-card bg-dark" style={{ width: "18rem" }}>
    <img
      src={exercise.videoUrl}
      alt={exercise.title}
      className="card-img-top"
      style={{ height: "200px", objectFit: "cover" }}
      onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=No+Image"}
    />
    <div className="card-body">
      <h5 className="card-title text-info">{exercise.title}</h5>
      <p className="card-text text-white">{exercise.description}</p>
      {exercise.duration && <small className="text-secondary">Duration: {exercise.duration} min</small>}
    </div>
  </div>
);

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await exerciseAPI.getExercises();
        setExercises(res.data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading exercises...</p>;
  if (exercises.length === 0) return <p className="text-center mt-5 text-warning">No exercises available.</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-white">Exercise & Wellness Hub</h2>
      <div className="d-flex flex-wrap justify-content-evenly">
        {exercises.map((ex, i) => (
          <ExerciseCard key={i} exercise={ex} />
        ))}
      </div>
    </div>
  );
}

export default Exercises;