export function generateInsights(moodHistory, stressHistory, currentMood, currentStress) {
  const insights = [];

  // 1. Live Immediate Feedback
  if (currentStress > 7) {
    insights.push({
      type: 'warning',
      message: "Your stress level is quite high right now. We strongly recommend taking a 5-minute break to use the Guided Breathing tool."
    });
  } else if (currentStress > 5) {
     insights.push({
      type: 'info',
      message: "You're experiencing moderate stress. A short walk or water break might help clear your head."
    });
  }

  if (currentMood === "Sad" || currentMood === "Stressed") {
    insights.push({
      type: 'warning',
      message: "We're sorry you're not feeling your best. Journaling your thoughts can sometimes help release negative emotions."
    });
  }

  if (!moodHistory || !stressHistory || moodHistory.length === 0 || stressHistory.length === 0) {
    if (insights.length === 0) {
      insights.push({ type: 'info', message: "Log your mood and stress levels to generate personalized insights." });
    }
    return insights;
  }
  
  // 2. Recent Stress Analysis
  const recentStress = stressHistory.slice(-7); // Last 7 entries
  const highStressDays = recentStress.filter(entry => entry.level > 6).length;
  
  if (highStressDays >= 3) {
    insights.push({
      type: 'warning',
      message: `You reported high stress levels ${highStressDays} times recently. Consider scheduling regular breaks and trying the guided breathing exercise.`
    });
  } else if (highStressDays === 0 && recentStress.length > 3) {
    insights.push({
      type: 'success',
      message: "Your stress levels have been well-managed recently! Keep up the good work."
    });
  }

  // Mood Trends
  const recentMoods = moodHistory.slice(-7);
  const sadDays = recentMoods.filter(entry => entry.value <= 2).length; // Sad or Stressed

  if (sadDays >= 4) {
    insights.push({
      type: 'warning',
      message: "It seems you've been feeling down lately. Please remember to reach out to friends, family, or check our Mental Health Resource Hub."
    });
  }

  // If no specific triggering events
  if (insights.length === 0) {
    insights.push({
      type: 'info',
      message: "Your mood and stress seem relatively stable. Maintain your routine!"
    });
  }

  return insights;
}
