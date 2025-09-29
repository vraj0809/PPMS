import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/feedbackPage.css"; // make sure this path is correct

export const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get patient data passed from PatientSelect
  const { patient } = location.state || {};

  const [feedback, setFeedback] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState([]); // store problem + feedback pairs

  if (!patient) {
    return (
      <div className="feedback-container">
        <h2>No patient data found.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }

    // Add feedback with problem
    setFeedbackHistory([
      ...feedbackHistory,
      { problem: patient.problem, feedback },
    ]);

    toast.success("Feedback submitted!", {
      position: "top-center",
      autoClose: 2000,
      transition: Bounce,
    });

    // Clear textarea
    setFeedback("");
  };

  return (
    <div className="feedback-container">
      <h2>Feedback for {patient.name}</h2>
      <p>
        <strong>Problem:</strong> {patient.problem}
      </p>

      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
        <div className="buttons">
          <button type="submit">Submit Feedback</button>
          <button type="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </form>

      {feedbackHistory.length > 0 && (
        <div className="feedback-history">
          <h3>Feedback History</h3>
          <ul>
            {feedbackHistory.map((entry, index) => (
              <li key={index} className="feedback-entry">
                <p>
                  <strong>Problem:</strong> {entry.problem}
                </p>
                <p>
                  <strong>Feedback:</strong> {entry.feedback}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
