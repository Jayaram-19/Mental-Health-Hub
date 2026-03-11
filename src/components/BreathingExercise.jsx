import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import confetti from "canvas-confetti";

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle, inhale, hold, exhale
  const [instruction, setInstruction] = useState("Ready to breathe?");

  useEffect(() => {
    let timeoutId;
    
    const cycleBreathing = () => {
      // Inhale
      setPhase("inhale");
      setInstruction("Breathe In...");
      
      timeoutId = setTimeout(() => {
        // Hold
        setPhase("hold");
        setInstruction("Hold...");
        
        timeoutId = setTimeout(() => {
          // Exhale
          setPhase("exhale");
          setInstruction("Breathe Out...");
          
          timeoutId = setTimeout(() => {
            if (isActive) cycleBreathing();
          }, 4000); // Exhale duration (4s)
        }, 4000); // Hold duration (4s)
      }, 4000); // Inhale duration (4s)
    };

    if (isActive) {
      cycleBreathing();
    } else {
      setPhase("idle");
      setInstruction("Ready to breathe?");
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [isActive]);

  const toggleBreathing = () => {
    if (isActive) {
       // Give them a little reward if they stop it
       confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#5f8cff', '#7b5fff', '#10b981']
      });
    }
    setIsActive(!isActive);
  };

  return (
    <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Guided Breathing</h2>
      
      <p className="text-muted mb-4">4-4-4 Box Breathing technique to reduce instant stress.</p>

      <div className="breathing-container">
        <div className={`breathe-circle ${phase}`}>
          {/* We rely on CSS scale animations for the circle expansion based on phase class */}
          {phase === "idle" ? "Start" : ""}
        </div>
      </div>

      <h3 style={{ height: '24px', margin: '16px 0', color: phase === 'hold' ? '#10b981' : 'var(--accent-blue)' }}>
        {instruction}
      </h3>

      <button onClick={toggleBreathing} className="primary-btn" style={{ width: 'auto', padding: '12px 32px' }}>
        {isActive ? <Pause size={20} /> : <Play size={20} />} {isActive ? "Stop" : "Begin"}
      </button>
    </div>
  );
}
