// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "../store/auth";

// export const Approve = () => {
//   const { user } = useAuth(); // logged-in doctor
//   const [socket, setSocket] = useState(null);
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//           autoConnect: true,
//           reconnection: true
//         });
//         // Join a center room
//         socket.emit("joinCenter", user._id);
    
//         socket.on("message", (msg) => {
//           setRequests((prev) => [...prev, msg]);
//         });
    
//         return () => {
//           socket.disconnect();
//         };
//       }, [user?._id]);

//   const handleResponse = (patient, status) => {
//     if (!socket) return;

//     // socket.emit("doctorResponse", {
//     //   patientId: patient.patientId,
//     //   drid: user._id,
//     //   status, // approved / rejected
//     // });

//     // setRequests((prev) =>
//     //   prev.filter((p) => p.patientId !== patient.patientId)
//     // );
//   };
// console.log(requests)
//   return (
//     <div className="doctor-dashboard">
//       <h1>Doctor Dashboard</h1>
//       <h2>Incoming Patient Requests</h2>

//       {requests.length === 0 && <p>No requests yet.</p>}

//       {requests.map((patient) => (
//         <div key={patient.patientId} className="request-card">
//           <p>
//             <strong>Name:</strong> {patient.fullname}
//           </p>
//           <p>
//             <strong>Email:</strong> {patient.email}
//           </p>
//           {/* <p>
//             <strong>Age:</strong> {patient.age}
//           </p> */}
//           <p>
//             <strong>Batch:</strong> {patient.batch}
//           </p>
//           <p>
//             <strong>Notes:</strong> {patient.disc}
//           </p>

//           <div className="actions">
//             <button onClick={() => handleResponse(patient, "approved")}>
//               ✅ Approve
//             </button>
//             <button onClick={() => handleResponse(patient, "rejected")}>
//               ❌ Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "../css/approval.css";

export const Approve = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  // ✅ Dummy patient data
  const dummyPatients = [
    { _id: "1", fullname: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", center: "Ahmedabad Center" },
    { _id: "2", fullname: "Priya Patel", email: "priya@example.com", phone: "9123456789", center: "Baroda Center" },
    { _id: "3", fullname: "Amit Singh", email: "amit@example.com", phone: "9988776655", center: "Surat Center" },
    { _id: "4", fullname: "Neha Joshi", email: "neha@example.com", phone: "9090909090", center: "Rajkot Center" },
  ];

  useEffect(() => {
 
    setPending(dummyPatients);
  }, []);

  
  const handleApprove = (id) => {
    const patient = pending.find((p) => p._id === id);
    if (patient) {
      setApproved([...approved, patient]);
      setPending(pending.filter((p) => p._id !== id));
      toast.success(`${patient.fullname} Approved ✅`, { transition: Bounce });
    }
  };

  // ✅ Reject patient (move from pending → rejected)
  const handleReject = (id) => {
    const patient = pending.find((p) => p._id === id);
    if (patient) {
      setRejected([...rejected, patient]);
      setPending(pending.filter((p) => p._id !== id));
      toast.error(`${patient.fullname} Rejected ❌`, { transition: Bounce });
    }
  };

  return (
    <div className="approval-container">
      <h1>Doctor Approval Dashboard</h1>

      {/* Pending Submissions */}
      <section>
        <h2>Pending Submissions</h2>
        {pending.length === 0 ? (
          <p>No pending submissions.</p>
        ) : (
          <div className="card-list">
            {pending.map((p) => (
              <div className="card" key={p._id}>
                <h3>{p.fullname}</h3>
                <p><strong>Email:</strong> {p.email}</p>
                <p><strong>Phone:</strong> {p.phone}</p>
                <p><strong>Center:</strong> {p.center}</p>
                <div className="actions">
                  <button onClick={() => handleApprove(p._id)} className="approve">Approve</button>
                  <button onClick={() => handleReject(p._id)} className="reject">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Patients */}
      <section>
        <h2>✅ Approved Patients</h2>
        {approved.length === 0 ? (
          <p>No approved patients yet.</p>
        ) : (
          <ul>
            {approved.map((p) => (
              <li key={p._id}>
                {p.fullname} - {p.email} - {p.phone} - {p.center}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Rejected Patients */}
      <section>
        <h2>❌ Rejected Patients</h2>
        {rejected.length === 0 ? (
          <p>No rejected patients yet.</p>
        ) : (
          <ul>
            {rejected.map((p) => (
              <li key={p._id}>
                {p.fullname} - {p.email} - {p.phone} - {p.center}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
