import FocusTimer from "../components/FocusTimer";
import BreathingExercise from "../components/BreathingExercise";
import AmbientSoundPlayer from "../components/AmbientSoundPlayer";

export default function Tools() {
  return (
    <div>
      <h1 className="page-title">Wellness Tools</h1>
      <p className="page-subtitle">Focus your mind, increase productivity, and find your center.</p>

      <div className="dashboard-grid">
        <AmbientSoundPlayer />
        <FocusTimer />
        <BreathingExercise />
      </div>
    </div>
  );
}
