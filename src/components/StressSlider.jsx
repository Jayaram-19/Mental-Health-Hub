import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

function StressSlider() {
  const [stress, setStress] = useState(5);

  useEffect(() => {
    const savedStress = localStorage.getItem("stressLevel");
    if (savedStress) setStress(Number(savedStress));
  }, []);

  function handleChange(e) {
    const value = Number(e.target.value);
    setStress(value);
    
    localStorage.setItem("stressLevel", value);

    // Save historical data
    const history = JSON.parse(localStorage.getItem("stressHistory")) || [];
    const dateStr = new Date().toLocaleDateString();
    
    const existingIndex = history.findIndex(entry => entry.date === dateStr);
    if (existingIndex >= 0) {
      history[existingIndex].level = value;
    } else {
      history.push({ level: value, date: dateStr });
    }

    localStorage.setItem("stressHistory", JSON.stringify(history));

    // Dispatch event to tell other components (Insights/Charts)
    window.dispatchEvent(new Event('trackerUpdated'));
  }

  const getSliderClass = () => {
    if (stress <= 3) return "slider-green";
    if (stress <= 6) return "slider-yellow";
    return "slider-red";
  };

  const getStatusText = () => {
    if (stress <= 3) return "Relaxed";
    if (stress <= 6) return "Moderate";
    return "High Stress";
  };

  return (
    <div className="flex" style={{ flexDirection: 'column', height: '100%' }}>
      <h2><Activity size={20} color={stress > 6 ? "#ef4444" : stress > 3 ? "#f59e0b" : "#10b981"} /> Stress Level</h2>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <input
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={handleChange}
          className={getSliderClass()}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
          <span>Low</span>
          <span style={{ fontWeight: '600', color: stress > 6 ? '#ef4444' : 'var(--text-main)', fontSize: '16px' }}>
            {getStatusText()} ({stress}/10)
          </span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

export default StressSlider;