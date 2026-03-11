import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, CloudRain, Wind, Coffee, Waves } from "lucide-react";

const SOUNDS = [
  { id: "rain", name: "Rain", icon: CloudRain, url: "https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg" },
  { id: "wind", name: "Wind", icon: Wind, url: "https://actions.google.com/sounds/v1/weather/strong_wind.ogg" },
  { id: "cafe", name: "Cafe", icon: Coffee, url: "https://actions.google.com/sounds/v1/crowds/restaurant_crowd.ogg" },
  { id: "waves", name: "Waves", icon: Waves, url: "https://actions.google.com/sounds/v1/water/ocean_waves_crashing.ogg" },
];

export default function AmbientSoundPlayer() {
  const [activeSound, setActiveSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeSound]);

  const toggleSound = (sound) => {
    if (activeSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSound(sound);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="card text-center dashboard-full" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(24px)'
    }}>
      <h2 style={{ marginBottom: '8px' }}>Ambient Sounds</h2>
      <p className="text-muted mb-4">Focus backgrounds to help you concentrate or relax.</p>
      
      {activeSound && (
        <audio 
          ref={audioRef} 
          src={activeSound.url} 
          loop 
        />
      )}

      <div className="flex gap-4" style={{ flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
        {SOUNDS.map((sound) => {
          const Icon = sound.icon;
          const isActive = activeSound?.id === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => toggleSound(sound)}
              className={isActive ? "active" : ""}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                minWidth: '100px',
                gap: '8px',
                border: isActive ? 'none' : '1px solid var(--btn-border)'
              }}
            >
              <Icon size={24} color={isActive ? "white" : "var(--accent-blue)"} />
              <span>{sound.name}</span>
              {isActive && (
                <div style={{ marginTop: '4px' }}>
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 w-full" style={{ maxWidth: '400px', background: 'var(--input-bg)', padding: '12px 24px', borderRadius: '50px' }}>
        <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)} className="icon-btn" style={{ padding: 0, border: 'none', background: 'transparent', boxShadow: 'none' }}>
          {volume === 0 ? <VolumeX size={20} className="text-muted" /> : <Volume2 size={20} className="text-muted" />}
        </button>
        <input 
          type="range" 
          min="0" max="1" step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          style={{ margin: 0, flexGrow: 1 }}
        />
      </div>
    </div>
  );
}
