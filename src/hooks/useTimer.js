import { useReducer, useEffect, useState } from "react";
import { timerReducer, initialState } from "../utils/timerReducer";
import { TIMER_ACTIONS, STORAGE_KEYS } from "../utils/constants";
import { saveToStorage, loadFromStorage } from "../utils/timerHelpers";

const useTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const [completedTimer, setCompletedTimer] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFromStorage(STORAGE_KEYS.TIMER_DATA);
    if (savedData) {
      dispatch({ type: TIMER_ACTIONS.LOAD_STATE, payload: savedData });
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TIMER_DATA, state);
  }, [state]);

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      const runningTimers = state.timers.filter(
        (timer) => timer.status === "running"
      );

      runningTimers.forEach((timer) => {
        if (timer.remainingTime > 0) {
          // Check for halfway alert
          if (
            timer.halfwayAlert &&
            timer.remainingTime === Math.floor(timer.duration / 2)
          ) {
            alert(`Halfway point reached for ${timer.name}!`);
          }

          dispatch({ type: TIMER_ACTIONS.TICK_TIMER, payload: timer.id });

          // Check if timer completed
          if (timer.remainingTime === 1) {
            dispatch({ type: TIMER_ACTIONS.COMPLETE_TIMER, payload: timer.id });
            setCompletedTimer(timer);
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  // Timer action functions
  const addTimer = (timerData) => {
    dispatch({ type: TIMER_ACTIONS.ADD_TIMER, payload: timerData });
  };

  const startTimer = (id) => {
    dispatch({ type: TIMER_ACTIONS.START_TIMER, payload: id });
  };

  const pauseTimer = (id) => {
    dispatch({ type: TIMER_ACTIONS.PAUSE_TIMER, payload: id });
  };

  const resetTimer = (id) => {
    dispatch({ type: TIMER_ACTIONS.RESET_TIMER, payload: id });
  };

  const handleBulkAction = (category, action) => {
    dispatch({
      type: TIMER_ACTIONS.BULK_ACTION,
      payload: { category, action },
    });
  };

  return {
    state,
    dispatch,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    handleBulkAction,
    completedTimer,
    setCompletedTimer,
  };
};

export default useTimer;
