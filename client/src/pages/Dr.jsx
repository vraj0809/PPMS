import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Dr = () => {
  const [socket, setSocket] = useState(null);
  const [center, setCenter] = useState("ahmedabad"); // Default center
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && center && message) {
      socket.emit("sendToCenter", { center, message });
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Doctor Panel - Send to Center</h2>

      {/* Center Dropdown */}
      <select
        value={center}
        onChange={(e) => setCenter(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="">select center</option>
        <option value="ahmedabad">Ahmedabad</option>
        <option value="mumbai">Mumbai</option>
      </select>

      {/* Message Input */}
      <input
        type="text"
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mr-2"
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Dr;
