import { useState, useEffect } from "react";
import MoodSelector from "../components/MoodSelector";
import StressSlider from "../components/StressSlider";
import { generateInsights } from "../utils/insightEngine";
import { Sparkles } from "lucide-react";
import DailyAffirmation from "../components/DailyAffirmation";

export default function Dashboard() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    // Check initial state
    updateInsights();

    // Listen to custom updates from components
    window.addEventListener("trackerUpdated", updateInsights);
    return () => window.removeEventListener("trackerUpdated", updateInsights);
  }, []);

  function updateInsights() {
    const moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    const stressHistory = JSON.parse(localStorage.getItem("stressHistory") || "[]");
    
    const currentMood = localStorage.getItem("todayMood");
    const currentStress = Number(localStorage.getItem("stressLevel") || 5);

    const newInsights = generateInsights(moodHistory, stressHistory, currentMood, currentStress);
    setInsights(newInsights);
  }

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Welcome back! Here's an overview of your mental wellness today.</p>

      <div className="dashboard-grid">
        <DailyAffirmation />

        <div className="card">
          <MoodSelector />
        </div>

        <div className="card">
          <StressSlider />
        </div>

        <div className="card dashboard-full" style={{ backgroundColor: 'var(--bg-gradient-1)' }}>
          <h2><Sparkles size={20} color="var(--accent-purple)" /> AI Behavioral Insights</h2>
          
          <div className="flex" style={{ flexDirection: 'column', gap: '12px' }}>
            {insights.map((insight, idx) => {
              let color = "var(--text-main)";
              if (insight.type === 'warning') color = "#ef4444";
              if (insight.type === 'success') color = "#10b981";
              if (insight.type === 'info') color = "var(--accent-blue)";

              return (
                <div key={idx} style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--card-bg)',
                  borderLeft: `4px solid ${color}`,
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {insight.message}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}