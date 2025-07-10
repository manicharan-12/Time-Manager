// App constants
export const TIMER_CATEGORIES = [
  "Workout",
  "Study",
  "Break",
  "Cooking",
  "Meditation",
];

export const TIMER_STATUS = {
  STOPPED: "stopped",
  RUNNING: "running",
  PAUSED: "paused",
  COMPLETED: "completed",
};

export const TIMER_ACTIONS = {
  ADD_TIMER: "ADD_TIMER",
  START_TIMER: "START_TIMER",
  PAUSE_TIMER: "PAUSE_TIMER",
  RESET_TIMER: "RESET_TIMER",
  TICK_TIMER: "TICK_TIMER",
  COMPLETE_TIMER: "COMPLETE_TIMER",
  BULK_ACTION: "BULK_ACTION",
  LOAD_STATE: "LOAD_STATE",
};

export const BULK_ACTIONS = {
  START: "start",
  PAUSE: "pause",
  RESET: "reset",
};

export const STORAGE_KEYS = {
  TIMER_DATA: "timerAppData",
  THEME: "timerAppTheme",
};

export const DEFAULT_TIMER_DURATION = 300; // 5 minutes in seconds
