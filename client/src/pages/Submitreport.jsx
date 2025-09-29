import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/submitReport.css";

export const SubmitReport = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // patient id
  const [report, setReport] = useState({
    patientId: id,
    patientName: "",
    age: "",
    therapy: "",
    therapyStage: "",
    therapyDay: "",
    date: "",
    bloodPressure: "",
    pulse: "",
    sugar: "",
    notes: "",
  });

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get old reports from localStorage
    const existingReports =
      JSON.parse(localStorage.getItem(`patientReports-${id}`)) || [];

    // Save new report
    const updatedReports = [...existingReports, report];
    localStorage.setItem(`patientReports-${id}`, JSON.stringify(updatedReports));

    // Navigate to visualization page
    navigate(`/visualize/${id}`);
  };

  return (
    <div className="report-form">
      <h2>Submit Patient Report</h2>
      <form onSubmit={handleSubmit}>
        <label>Patient Name:</label>
        <input
          type="text"
          name="patientName"
          value={report.patientName}
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={report.age}
          onChange={handleChange}
          required
        />

        {/* <label>Therapy:</label>
        <input
          type="text"
          name="therapy"
          value={report.therapy}
          onChange={handleChange}
          required
        /> */}

        <label>Therapy Stage:</label>
        <input
          type="text"
          name="therapyStage"
          value={report.therapyStage}
          onChange={handleChange}
          placeholder="e.g. Stage 1"
          required
        />

        <label>Day of Therapy:</label>
        <input
          type="number"
          name="therapyDay"
          value={report.therapyDay}
          onChange={handleChange}
          placeholder="e.g. 1"
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={report.date}
          onChange={handleChange}
          required
        />

        <label>Blood Pressure (mmHg):</label>
        <input
          type="text"
          name="bloodPressure"
          value={report.bloodPressure}
          onChange={handleChange}
          placeholder="e.g. 120/80"
          required
        />

        <label>Pulse (bpm):</label>
        <input
          type="number"
          name="pulse"
          value={report.pulse}
          onChange={handleChange}
          required
        />

        <label>Sugar Level (mg/dL):</label>
        <input
          type="number"
          name="sugar"
          value={report.sugar}
          onChange={handleChange}
          required
        />

        <label>Doctor Notes:</label>
        <textarea
          name="notes"
          value={report.notes}
          onChange={handleChange}
          rows="3"
        />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};


