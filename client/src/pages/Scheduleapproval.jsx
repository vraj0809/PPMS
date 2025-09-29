import React, { useState, useEffect } from "react";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/approval.css";

export const Scheduleapproval = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  // ✅ Dummy patient requests with requested schedule
  const dummyRequests = [
    { _id: "1", fullname: "Rahul Sharma", email: "rahul@example.com", requestedDate: "2025-09-25", requestedSlot: "morning" },
    { _id: "2", fullname: "Priya Patel", email: "priya@example.com", requestedDate: "2025-09-26", requestedSlot: "noon" },
    { _id: "3", fullname: "Amit Singh", email: "amit@example.com", requestedDate: "2025-09-27", requestedSlot: "evening" },
  ];

  useEffect(() => {
    setPending(dummyRequests);
  }, []);

  const handleApprove = (id) => {
    const patient = pending.find((p) => p._id === id);
    if (patient) {
      setApproved([...approved, patient]);
      setPending(pending.filter((p) => p._id !== id));
      toast.success(`${patient.fullname}'s schedule approved ✅`, { transition: Bounce });
    }
  };

  const handleReject = (id) => {
    const patient = pending.find((p) => p._id === id);
    if (patient) {
      setRejected([...rejected, patient]);
      setPending(pending.filter((p) => p._id !== id));
      toast.error(`${patient.fullname}'s schedule rejected ❌`, { transition: Bounce });
    }
  };

  return (
    <div className="approval-container">
      <h1>Doctor Schedule Approval</h1>

      {/* Pending Schedule Requests */}
      <section>
        <h2>Pending Schedule Requests</h2>
        {pending.length === 0 ? (
          <p>No pending schedule requests.</p>
        ) : (
          <div className="card-list">
            {pending.map((p) => (
              <div className="card" key={p._id}>
                <h3>{p.fullname}</h3>
                <p><strong>Email:</strong> {p.email}</p>
                <p><strong>Requested Date:</strong> {p.requestedDate}</p>
                <p><strong>Requested Slot:</strong> {p.requestedSlot.charAt(0).toUpperCase() + p.requestedSlot.slice(1)}</p>
                <div className="actions">
                  <button className="approve" onClick={() => handleApprove(p._id)}>✅ Approve</button>
                  <button className="reject" onClick={() => handleReject(p._id)}>❌ Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Schedule */}
      <section>
        <h2>✅ Approved Schedule</h2>
        {approved.length === 0 ? (
          <p>No approved schedules yet.</p>
        ) : (
          <ul>
            {approved.map((p) => (
              <li key={p._id}>
                {p.fullname} - {p.requestedDate} - {p.requestedSlot.charAt(0).toUpperCase() + p.requestedSlot.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Rejected Schedule */}
      <section>
        <h2>❌ Rejected Schedule</h2>
        {rejected.length === 0 ? (
          <p>No rejected schedules yet.</p>
        ) : (
          <ul>
            {rejected.map((p) => (
              <li key={p._id}>
                {p.fullname} - {p.requestedDate} - {p.requestedSlot.charAt(0).toUpperCase() + p.requestedSlot.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
