import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ScheduleRequest.css"; // import CSS

export const ScheduleRequest = () => {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const handleRequest = () => {
    if (!date || !slot) {
      toast.error("Please select both date and time slot!");
      return;
    }

    // Simulate doctor approval (replace with real API in production)
    const doctorApproved = Math.random() > 0.5;

    if (doctorApproved) {
      toast.success("Request approved by doctor!");
    } else {
      toast.info("Request sent, waiting for doctor approval...");
    }

    // Reset form
    setDate("");
    setSlot("");
  };

  return (
    <div className="schedule-container">
      <h2>Request Therapy Schedule</h2>

      <div className="form-group">
        <label>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Select Time Slot:</label>
        <select value={slot} onChange={(e) => setSlot(e.target.value)}>
          <option value="">--Choose--</option>
          <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
          <option value="noon">Noon (12:00 PM - 4:00 PM)</option>
          <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
        </select>
      </div>

      <button className="request-btn" onClick={handleRequest}>
        Send Request
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ScheduleRequest;
