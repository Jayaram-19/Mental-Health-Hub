import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [moodData, setMoodData] = useState({ labels: [], datasets: [] });
  const [trendData, setTrendData] = useState({ labels: [], datasets: [] });

  function loadChartData() {
    const moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    const stressHistory = JSON.parse(localStorage.getItem("stressHistory") || "[]");

    // 1. Mood Frequency (Bar Chart)
    const moodCounts = { Happy: 0, Neutral: 0, Sad: 0, Stressed: 0 };
    moodHistory.forEach(entry => {
      if (moodCounts[entry.mood] !== undefined) {
        moodCounts[entry.mood]++;
      }
    });

    setMoodData({
      labels: Object.keys(moodCounts),
      datasets: [
        {
          label: "Mood Frequency",
          data: Object.values(moodCounts),
          backgroundColor: [
            "rgba(16, 185, 129, 0.6)", // Happy - Green
            "rgba(95, 140, 255, 0.6)", // Neutral - Blue
            "rgba(245, 158, 11, 0.6)", // Sad - Yellow
            "rgba(239, 68, 68, 0.6)"   // Stressed - Red
          ],
          borderColor: [
            "rgba(16, 185, 129, 1)",
            "rgba(95, 140, 255, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(239, 68, 68, 1)"
          ],
          borderWidth: 1,
          borderRadius: 8
        }
      ]
    });

    // 2. Weekly Trends - Mood vs Stress (Line Chart)
    // Create a map of the last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push(d.toLocaleDateString());
    }

    const moodTrendData = last7Days.map(date => {
      const entry = moodHistory.find(e => e.date === date);
      return entry ? entry.value : null; // 4=Happy, 3=Neutral, 2=Sad, 1=Stressed, 0=None
    });

    const stressTrendData = last7Days.map(date => {
      const entry = stressHistory.find(e => e.date === date);
      return entry ? entry.level : null; // 1-10 scale
    });

    setTrendData({
      labels: last7Days.map(d => d.slice(0, 5)), // MM/DD format roughly
      datasets: [
        {
          label: "Mood Level (1-4)",
          data: moodTrendData,
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: "Stress Level (1-10)",
          data: stressTrendData,
          borderColor: "rgba(239, 68, 68, 1)",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    });
  }

  useEffect(() => {
    loadChartData();
    window.addEventListener("trackerUpdated", loadChartData);
    return () => window.removeEventListener("trackerUpdated", loadChartData);
  }, []);


  const trendOptions = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { type: 'linear', display: true, position: 'left', min: 0, max: 5 },
      y1: { type: 'linear', display: true, position: 'right', min: 0, max: 10, grid: { drawOnChartArea: false } }
    }
  };

  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">Understand your patterns and mental health trends over time.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Mood Frequency</h2>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
            {moodData.labels.length > 0 ? <Bar data={moodData} options={{ maintainAspectRatio: false }} /> : <p className="text-muted">Loading...</p>}
          </div>
        </div>

        <div className="card dashboard-full">
          <h2>Mood vs Stress Trends (Last 7 Days)</h2>
          <div style={{ height: '350px' }}>
             {trendData.labels.length > 0 ? <Line data={trendData} options={{ ...trendOptions, maintainAspectRatio: false }} /> : <p className="text-muted">Loading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
