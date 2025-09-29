import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PatientDashboard = () => {
  // Example data
  const reports = [
    { therapyDay: 1, bloodPressure: "120/80", pulse: 72, sugar: 95, therapyStage: "Start", date: "2025-09-10", patientName: "John Doe", age: 30, therapy: "Detox" },
    { therapyDay: 2, bloodPressure: "118/78", pulse: 70, sugar: 92, therapyStage: "Mid", date: "2025-09-11" },
    { therapyDay: 3, bloodPressure: "115/75", pulse: 68, sugar: 90, therapyStage: "Mid", date: "2025-09-12" },
    { therapyDay: 4, bloodPressure: "112/74", pulse: 67, sugar: 88, therapyStage: "End", date: "2025-09-13" },
  ];

  const labels = reports.map(r => `Day ${r.therapyDay}`);
  const systolic = reports.map(r => Number(r.bloodPressure.split("/")[0]));
  const diastolic = reports.map(r => Number(r.bloodPressure.split("/")[1]));
  const pulse = reports.map(r => r.pulse);
  const sugar = reports.map(r => r.sugar);

  const data = {
    labels,
    datasets: [
      { label: "Systolic BP", data: systolic, borderColor: "rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.3)", tension: 0.3 },
      { label: "Diastolic BP", data: diastolic, borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.3)", tension: 0.3 },
      { label: "Pulse", data: pulse, borderColor: "rgba(75, 192, 192, 1)", backgroundColor: "rgba(75, 192, 192, 0.3)", tension: 0.3 },
      { label: "Sugar", data: sugar, borderColor: "rgba(255, 206, 86, 1)", backgroundColor: "rgba(255, 206, 86, 0.3)", tension: 0.3 },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "John Doe - Detox Therapy Progress" }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>John Doe's Therapy Progress</h2>
      <p><strong>Age:</strong> 30 | <strong>Therapy:</strong> Detox</p>
      <Line data={data} options={options} />
    </div>
  );
};


