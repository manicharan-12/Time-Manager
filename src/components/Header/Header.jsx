import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Clock, Sun, Moon, History } from "lucide-react";

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <span className="hidden sm:inline">Timer Manager</span>
            <span className="sm:hidden">Timers</span>
          </h1>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/")}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  location.pathname === "/"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Home
              </button>

              <button
                onClick={() => navigate("/history")}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm sm:text-base ${
                  location.pathname === "/history"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </button>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
