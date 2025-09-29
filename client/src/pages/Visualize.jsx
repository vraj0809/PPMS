import React from "react";
import { useParams } from "react-router-dom";
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

export const Visualize = () => {
  const { id } = useParams();
  const reports = JSON.parse(localStorage.getItem(`patientReports-${id}`)) || [];

  if (reports.length === 0) {
    return <p>No report found. Please submit a report first.</p>;
  }

  // Extract data
  const labels = reports.map((r) => `Day ${r.therapyDay}`);
  const systolic = reports.map((r) =>
    r.bloodPressure.includes("/") ? Number(r.bloodPressure.split("/")[0]) : 0
  );
  const diastolic = reports.map((r) =>
    r.bloodPressure.includes("/") ? Number(r.bloodPressure.split("/")[1]) : 0
  );
  const pulse = reports.map((r) => Number(r.pulse));
  const sugar = reports.map((r) => Number(r.sugar));

  const data = {
    labels,
    datasets: [
      {
        label: "Systolic BP",
        data: systolic,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        tension: 0.3,
      },
      {
        label: "Diastolic BP",
        data: diastolic,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        tension: 0.3,
      },
      {
        label: "Pulse",
        data: pulse,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.3,
      },
      {
        label: "Sugar",
        data: sugar,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `${reports[0].patientName} - ${reports[0].therapy}`,
      },
    },
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto" }}>
      <h2>{reports[0].patientName}'s Therapy Progress</h2>
      <p>
        <strong>Age:</strong> {reports[0].age} |{" "}
        <strong>Therapy:</strong> {reports[0].therapy}
      </p>
      <Line data={data} options={options} />

      <h3 style={{ marginTop: "30px" }}>All Reports</h3>
      <ul>
        {reports.map((r, i) => (
          <li key={i}>
            <strong>Day {r.therapyDay} ({r.date})</strong> - Stage:{" "}
            {r.therapyStage}, BP: {r.bloodPressure}, Pulse: {r.pulse}, Sugar:{" "}
            {r.sugar}, Notes: {r.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};
