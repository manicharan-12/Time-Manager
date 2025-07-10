// Timer utility functions
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const getProgress = (remaining, total) => {
  return ((total - remaining) / total) * 100;
};

// Updated theme-aware helper functions

export const getStatusBg = (status, darkMode = false) => {
  if (darkMode) {
    switch (status) {
      case "running":
        return "bg-green-900/20 border-green-700";
      case "paused":
        return "bg-yellow-900/20 border-yellow-700";
      case "completed":
        return "bg-blue-900/20 border-blue-700";
      default:
        return "bg-gray-800/50 border-gray-600";
    }
  } else {
    switch (status) {
      case "running":
        return "bg-green-100 border-green-200";
      case "paused":
        return "bg-yellow-100 border-yellow-200";
      case "completed":
        return "bg-blue-100 border-blue-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  }
};

export const getStatusColor = (status, darkMode = false) => {
  if (darkMode) {
    switch (status) {
      case "running":
        return "text-green-400 bg-green-900/30";
      case "paused":
        return "text-yellow-400 bg-yellow-900/30";
      case "completed":
        return "text-blue-400 bg-blue-900/30";
      default:
        return "text-gray-400 bg-gray-800/50";
    }
  } else {
    switch (status) {
      case "running":
        return "text-green-700 bg-green-100";
      case "paused":
        return "text-yellow-700 bg-yellow-100";
      case "completed":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }
};

export const getTimersByCategory = (timers, filter = "all") => {
  const filteredTimers =
    filter === "all"
      ? timers
      : timers.filter((timer) => timer.category === filter);

  const categories = [
    ...new Set(filteredTimers.map((timer) => timer.category)),
  ];

  return categories.map((category) => ({
    name: category,
    timers: filteredTimers.filter((timer) => timer.category === category),
  }));
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};
