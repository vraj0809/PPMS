import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/patientSelect.css";

export const PatientSelect = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Dummy patients
  const patients = [
    { id: "1", name: "Rahul Sharma", problem: "High fever" },
    { id: "2", name: "Priya Patel", problem: "Migraine" },
    { id: "3", name: "Amit Singh", problem: "Back pain" },
    { id: "4", name: "Neha Joshi", problem: "Allergy" },
  ];

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id, type) => {
    if (type === "visualize") navigate(`/visualize/${id}`);
    else if (type === "submit") navigate(`/submit-report/${id}`);
    else if (type === "feedback") {
      const patient = patients.find((p) => p.id === id);
      navigate(`/feedback/${id}`, { state: { patient } });
    }
  };

  return (
    <div className="patient-select">
      <h1>Patient Selection</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Navigate to Approve Schedule page */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <button
          className="approve-schedule-btn"
          onClick={() => navigate("/Scheduleapp")}
        >
          Go to Schedule Approval
        </button>
      </div>

      {/* Patient list */}
      <div className="patient-list">
        {filtered.map((p) => (
          <div key={p.id} className="patient-card">
            <h3>{p.name}</h3>
            <button onClick={() => handleSelect(p.id, "visualize")}>
              Visualize Report
            </button>
            <button onClick={() => handleSelect(p.id, "submit")}>
              Submit Report
            </button>
            <button onClick={() => handleSelect(p.id, "feedback")}>
              Feedback
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
