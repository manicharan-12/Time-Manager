import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import TimerItem from "./TimerItem";

const TimerCategory = ({
  category,
  darkMode,
  expanded,
  onToggle,
  onBulkAction,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-sm border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } mx-2 sm:mx-0`}
    >
      {/* Category Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-base sm:text-lg font-semibold hover:text-blue-500 transition-colors min-w-0 flex-shrink-0"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            )}
            <span className="truncate">
              {category.name} ({category.timers.length})
            </span>
          </button>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => onBulkAction(category.name, "start")}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-green-500 hover:bg-green-600 text-white rounded text-xs sm:text-sm transition-colors flex-1 sm:flex-none min-w-0"
            >
              Start All
            </button>
            <button
              onClick={() => onBulkAction(category.name, "pause")}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs sm:text-sm transition-colors flex-1 sm:flex-none min-w-0"
            >
              Pause All
            </button>
            <button
              onClick={() => onBulkAction(category.name, "reset")}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs sm:text-sm transition-colors flex-1 sm:flex-none min-w-0"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Category Timers */}
      {expanded && (
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {category.timers.map((timer) => (
            <TimerItem
              key={timer.id}
              timer={timer}
              darkMode={darkMode}
              onStart={onStart}
              onPause={onPause}
              onReset={onReset}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerCategory;
