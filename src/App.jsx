import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import TimerList from "./components/TimerList/TimerList";
import History from "./components/History/History";
import AddTimerModal from "./components/Modals/AddTimerModal";
import CompletionModal from "./components/Modals/CompletionModal";
import useTimer from "./hooks/useTimer";

const App = () => {
  const {
    state,
    dispatch,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    handleBulkAction,
    completedTimer,
    setCompletedTimer,
  } = useTimer();

  const [showAddTimer, setShowAddTimer] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const savedTheme = localStorage.getItem("timerAppTheme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("timerAppTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAddTimer = (newTimer) => {
    addTimer(newTimer);
    setShowAddTimer(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state.history, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "timer-history.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Router>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="max-full px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <TimerList
                  state={state}
                  dispatch={dispatch}
                  darkMode={darkMode}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  setShowAddTimer={setShowAddTimer}
                  startTimer={startTimer}
                  pauseTimer={pauseTimer}
                  resetTimer={resetTimer}
                  handleBulkAction={handleBulkAction}
                />
              }
            />
            <Route
              path="/history"
              element={
                <History
                  history={state.history}
                  darkMode={darkMode}
                  exportData={exportData}
                />
              }
            />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {showAddTimer && (
          <AddTimerModal
            darkMode={darkMode}
            categories={state.categories}
            onAdd={handleAddTimer}
            onClose={() => setShowAddTimer(false)}
          />
        )}

        {completedTimer && (
          <CompletionModal
            darkMode={darkMode}
            timer={completedTimer}
            onClose={() => setCompletedTimer(null)}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
