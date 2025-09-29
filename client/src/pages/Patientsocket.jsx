import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";

const PatientSocket = () => {
  const { user } = useAuth(); // user.center is assumed
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?.center) return;

    const socket = io("http://localhost:5000", {
      autoConnect: true,
      reconnection: true
    });
    // Join a center room
    socket.emit("joinCenter", user.center);

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.center]);

  return (
    <div className="p-4">
      <h2>Messages for {user?.center} Center</h2>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSocket;
