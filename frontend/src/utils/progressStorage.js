// Shared progress/stats for both Normal and Simple Dashboard

export const SIMPLE_STORAGE_KEY = "paratrain_simple_progress";

export const ORDER = ["arms", "wrists", "legs", "fullbody"];

export function getDefaultProgress() {
  return {
    sessionsCompleted: 0,
    trainingTimeMinutes: 0,
    streak: 0,
    totalSessions: 0,
    accuracy: 90,
    lastReportPercent: 98,
    lastReportTitle: "Full Body Report",
  };
}

export function loadProgress() {
  try {
    const s = localStorage.getItem(SIMPLE_STORAGE_KEY);
    if (s) return { ...getDefaultProgress(), ...JSON.parse(s) };
  } catch (_) {}
  return getDefaultProgress();
}

export function saveProgress(p) {
  try {
    localStorage.setItem(SIMPLE_STORAGE_KEY, JSON.stringify(p));
  } catch (_) {}
}
