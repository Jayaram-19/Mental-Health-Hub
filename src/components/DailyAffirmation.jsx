import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const affirmations = [
  "You are capable of amazing things.",
  "Your mental health is a priority. Your happiness is an essential.",
  "You're allowed to take up space.",
  "It's okay to not be okay. Just don't give up.",
  "You are stronger than your anxiety.",
  "Mistakes are proof that you are trying.",
  "Take a deep breath. You're doing the best you can.",
  "Progress, not perfection.",
  "You deserve the love you keep trying to give everyone else."
];

export default function DailyAffirmation() {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    // Pick a random quote on mount, or we could seed it by the day if we wanted it to be constant all day
    const randomIdx = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIdx]);
  }, []);

  return (
    <div className="card dashboard-full" style={{ 
      background: 'linear-gradient(135deg, rgba(95, 140, 255, 0.15), rgba(123, 95, 255, 0.15))',
      backdropFilter: 'blur(20px)',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Quote size={48} color="rgba(95, 140, 255, 0.2)" style={{ position: 'absolute', top: '20px', left: '20px' }} />
      <h2 style={{ fontSize: '24px', fontStyle: 'italic', fontWeight: '500', color: 'var(--text-main)', maxWidth: '600px', margin: 0, zIndex: 1, lineHeight: '1.4' }}>
        "{affirmation}"
      </h2>
      <p className="text-muted" style={{ marginTop: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', zIndex: 1 }}>
        Daily Affirmation
      </p>
    </div>
  );
}
