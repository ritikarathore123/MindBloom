

import React, { useState } from "react";
import { scoreAPI } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionHeader from "../components/SectionHeader";

const ScorePage = () => {
  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead or of hurting yourself in some way?",
  ];

  const options = [
    { text: "Not at all", value: 0 },
    { text: "Several days", value: 1 },
    { text: "More than half the days", value: 2 },
    { text: "Nearly every day", value: 3 },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [scoreData, setScoreData] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [error, setError] = useState("");

  const handleSelect = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const getResultText = (score) => {
    if (score <= 4) return "Minimal depression";
     if (score <= 9) return "Mild depression";
    if (score <= 14) return "Moderate depression";
    if (score <= 19) return "Moderately severe depression";
    return "Severe depression";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.includes(null)) return setError("Please answer all questions.");

    setError("");
    const score = answers.reduce((acc, cur) => acc + cur, 0);
    setTotalScore(score);

    try {
      const res = await scoreAPI.getScoreByRange(score);
      const data = res?.data?.score;
      if (!data) throw new Error("No score data found");

      setScoreData(data);
      scoreAPI.submitUserScore(score).catch(() => {}); 

      toast.success("Score fetched successfully!");
    } catch {
      toast.error("Failed to fetch score. Check backend or network.");
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <SectionHeader
        title="🧠 MindBloom Mood Assessment"
        subtitle="Answer honestly to assess your mental wellness."
      />

      <div className="card p-4 shadow-lg bg-white">
        <div className="alert alert-secondary mb-4">
          Select one option for each question from 0 (Not at all) to 3 (Nearly every day).
        </div>
        <form onSubmit={handleSubmit}>
          <ol className="list-group list-group-numbered mb-4">
            {questions.map((q, idx) => (
              <li key={idx} className="list-group-item">
                <p className="fw-semibold mb-2">{q}</p>
                <div className="d-flex flex-wrap gap-3">
                  {options.map((opt) => (
                    <div key={opt.value} className="form-check">
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        value={opt.value}
                        checked={answers[idx] === opt.value}
                        onChange={() => handleSelect(idx, opt.value)}
                        className="form-check-input"
                        id={`q${idx}-opt${opt.value}`}
                      />
                      <label className="form-check-label" htmlFor={`q${idx}-opt${opt.value}`}>
                        {opt.text}
                      </label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          {error && <p className="text-danger">{error}</p>}

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </form>
      </div>

      {scoreData && (
        <div className="card mt-5 p-4 shadow-lg bg-light">
          <h3 className="text-center text-dark">Your Score: {totalScore}</h3>
          <p className="text-center fw-semibold">{getResultText(totalScore)}</p>
          <h5 className="text-success text-center mt-3">{scoreData.what_it_means}</h5>
          <p className="text-center">{scoreData.detailed_meaning_and_actions}</p>
          <blockquote className="blockquote border-start border-4 ps-3 my-4">
            <p className="fst-italic">“{scoreData.inspiring_quote}.”</p>
          </blockquote>
          <div className="alert alert-info text-center">
            <h5>Recommended Action</h5>
            <p>{scoreData.call_to_action}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScorePage;

