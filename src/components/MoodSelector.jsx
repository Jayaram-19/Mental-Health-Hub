import { useState, useEffect } from "react";
import { Smile, Frown, Meh, Angry } from "lucide-react";

function MoodSelector() {
  const [mood, setMood] = useState("");

  useEffect(() => {
    const today = localStorage.getItem("todayMood");
    if (today) setMood(today);
  }, []);

  function handleMoodSelect(selectedMood) {
    setMood(selectedMood);

    // Save historical data
    const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
    const dateStr = new Date().toLocaleDateString();
    
    // Check if we already have an entry for today and update it, else push new
    const existingIndex = history.findIndex(entry => entry.date === dateStr);
    if (existingIndex >= 0) {
      history[existingIndex].mood = selectedMood;
    } else {
      history.push({ mood: selectedMood, date: dateStr, value: getMoodValue(selectedMood) });
    }

    localStorage.setItem("moodHistory", JSON.stringify(history));
    localStorage.setItem("todayMood", selectedMood);

    // Dispatch custom event to tell chart to update
    window.dispatchEvent(new Event('trackerUpdated'));
  }

  // Helper to map mood to a numerical value for charting
  function getMoodValue(moodStr) {
    if (moodStr === "Happy") return 4;
    if (moodStr === "Neutral") return 3;
    if (moodStr === "Sad") return 2;
    if (moodStr === "Stressed") return 1;
    return 0;
  }

  return (
    <div className="flex" style={{ flexDirection: 'column', height: '100%' }}>
      <h2><Smile size={20} color="var(--accent-blue)" /> How are you feeling today?</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto', marginBottom: 'auto' }}>
        <button 
          className={mood === "Happy" ? "active" : ""} 
          onClick={() => handleMoodSelect("Happy")}
          style={{ padding: '16px' }}
        >
          <Smile size={24} /> Happy
        </button>
        <button 
          className={mood === "Neutral" ? "active" : ""} 
          onClick={() => handleMoodSelect("Neutral")}
          style={{ padding: '16px' }}
        >
          <Meh size={24} /> Neutral
        </button>
        <button 
          className={mood === "Sad" ? "active" : ""} 
          onClick={() => handleMoodSelect("Sad")}
          style={{ padding: '16px' }}
        >
          <Frown size={24} /> Sad
        </button>
        <button 
          className={mood === "Stressed" ? "active" : ""} 
          onClick={() => handleMoodSelect("Stressed")}
          style={{ padding: '16px' }}
        >
          <Angry size={24} /> Stressed
        </button>
      </div>

      {mood && (
        <p className="text-sm text-center text-muted mt-4">
          Current logged mood: <strong style={{ color: 'var(--text-main)' }}>{mood}</strong>
        </p>
      )}
    </div>
  );
}

export default MoodSelector;