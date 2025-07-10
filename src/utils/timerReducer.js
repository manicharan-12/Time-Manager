import { TIMER_ACTIONS, TIMER_CATEGORIES } from "./constants";

export const initialState = {
  timers: [],
  history: [],
  categories: TIMER_CATEGORIES,
};

export const timerReducer = (state, action) => {
  switch (action.type) {
    case TIMER_ACTIONS.ADD_TIMER:
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            ...action.payload,
            id: Date.now(),
            remainingTime: action.payload.duration,
            status: "stopped",
          },
        ],
      };

    case TIMER_ACTIONS.START_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload ? { ...timer, status: "running" } : timer
        ),
      };

    case TIMER_ACTIONS.PAUSE_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload ? { ...timer, status: "paused" } : timer
        ),
      };

    case TIMER_ACTIONS.RESET_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? {
                ...timer,
                remainingTime: timer.duration,
                status: "stopped",
              }
            : timer
        ),
      };

    case TIMER_ACTIONS.TICK_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) => {
          if (
            timer.id === action.payload &&
            timer.status === "running" &&
            timer.remainingTime > 0
          ) {
            const newRemainingTime = timer.remainingTime - 1;
            if (newRemainingTime === 0) {
              return { ...timer, remainingTime: 0, status: "completed" };
            }
            return { ...timer, remainingTime: newRemainingTime };
          }
          return timer;
        }),
      };

    case TIMER_ACTIONS.COMPLETE_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, status: "completed" }
            : timer
        ),
        history: [
          ...state.history,
          {
            id: Date.now(),
            name: state.timers.find((t) => t.id === action.payload)?.name,
            category: state.timers.find((t) => t.id === action.payload)
              ?.category,
            completionTime: new Date().toLocaleString(),
            duration: state.timers.find((t) => t.id === action.payload)
              ?.duration,
          },
        ],
      };

    case TIMER_ACTIONS.BULK_ACTION:
      return {
        ...state,
        timers: state.timers.map((timer) => {
          if (timer.category === action.payload.category) {
            switch (action.payload.action) {
              case "start":
                return { ...timer, status: "running" };
              case "pause":
                return { ...timer, status: "paused" };
              case "reset":
                return {
                  ...timer,
                  remainingTime: timer.duration,
                  status: "stopped",
                };
              default:
                return timer;
            }
          }
          return timer;
        }),
      };

    case TIMER_ACTIONS.LOAD_STATE:
      return action.payload;

    default:
      return state;
  }
};
