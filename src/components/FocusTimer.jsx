import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      // Auto switch between Focus and Break
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 min break
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60); // 25 min focus
      }
      setIsActive(false);
      
      if (window.Notification && Notification.permission === "granted") {
        new Notification(isBreak ? "Break Over! Back to Focus." : "Focus Session Complete! Take a 5 min break.");
      }

      if (!isBreak) {
        // Trigger confetti when focus session ends
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => {
    // Request notification permission on first interaction
    if (window.Notification && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const setMode = (breakMode) => {
    setIsActive(false);
    setIsBreak(breakMode);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = isBreak 
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100 
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Focus & Break Timer</h2>
      
      <div className="flex gap-4 mb-4">
        <button className={!isBreak ? "active" : ""} onClick={() => setMode(false)}>Focus (25m)</button>
        <button className={isBreak ? "active" : ""} onClick={() => setMode(true)}>Break (5m)</button>
      </div>

      <div style={{
        position: 'relative', width: '200px', height: '200px', 
        borderRadius: '50%', border: '8px solid var(--input-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `conic-gradient(var(--accent-blue) ${progress}%, transparent 0)`
      }}>
        <div style={{
          position: 'absolute', width: '184px', height: '184px',
          borderRadius: '50%', backgroundColor: 'var(--card-bg)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: '48px', fontWeight: '700', color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-muted">{isBreak ? "Break" : "Focus"}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={toggleTimer} className="primary-btn" style={{ width: 'auto', padding: '12px 32px' }}>
          {isActive ? <Pause size={20} /> : <Play size={20} />} {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer} className="icon-btn" style={{ marginTop: '16px' }} title="Reset">
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
