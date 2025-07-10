import React from "react";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import {
  formatTime,
  getProgress,
  getStatusColor,
  getStatusBg,
} from "../../utils/timerHelpers";

const TimerItem = ({ timer, darkMode, onStart, onPause, onReset }) => {
  return (
    <div
      className={`p-3 sm:p-4 rounded-lg border ${getStatusBg(
        timer.status,
        darkMode
      )} ${
        darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
      } transition-all duration-200`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <h3
              className={`font-semibold text-base sm:text-lg truncate ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {timer.name}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(
                  timer.status,
                  darkMode
                )}`}
              >
                {timer.status.toUpperCase()}
              </span>
              {timer.status === "completed" && (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div
              className={`text-xl sm:text-2xl font-mono font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {formatTime(timer.remainingTime)}
            </div>

            <div className="flex-1 max-w-full sm:max-w-xs">
              <div
                className={`w-full rounded-full h-2 ${
                  darkMode ? "bg-gray-600" : "bg-gray-200"
                }`}
              >
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${getProgress(
                      timer.remainingTime,
                      timer.duration
                    )}%`,
                  }}
                />
              </div>
              <div
                className={`text-xs sm:text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {Math.round(getProgress(timer.remainingTime, timer.duration))}%
                complete
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center sm:justify-end flex-shrink-0">
          {timer.status !== "running" && timer.status !== "completed" && (
            <button
              onClick={() => onStart(timer.id)}
              className="p-2 sm:p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex-shrink-0"
              aria-label="Start timer"
            >
              <Play className="w-4 h-4" />
            </button>
          )}

          {timer.status === "running" && (
            <button
              onClick={() => onPause(timer.id)}
              className="p-2 sm:p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex-shrink-0"
              aria-label="Pause timer"
            >
              <Pause className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onReset(timer.id)}
            className={`p-2 sm:p-3 rounded-lg transition-colors flex-shrink-0 ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            }`}
            aria-label="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerItem;
