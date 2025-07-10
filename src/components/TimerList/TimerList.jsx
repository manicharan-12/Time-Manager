import React, { useState } from "react";
import { Plus, Filter, Clock } from "lucide-react";
import TimerCategory from "./TimerCategory";
import EmptyState from "../common/EmptyState";
import { getTimersByCategory } from "../../utils/timerHelpers";

const TimerList = ({
  state,
  darkMode,
  categoryFilter,
  setCategoryFilter,
  setShowAddTimer,
  startTimer,
  pauseTimer,
  resetTimer,
  handleBulkAction,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (categoryName) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const timersByCategory = getTimersByCategory(state.timers, categoryFilter);

  if (state.timers.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No timers yet"
        description="Create your first timer to get started"
        buttonText="Add Your First Timer"
        onButtonClick={() => setShowAddTimer(true)}
      />
    );
  }

  const hasFilteredTimers = timersByCategory.some(
    (category) => category.timers.length > 0
  );

  if (!hasFilteredTimers) {
    return (
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <button
              onClick={() => setShowAddTimer(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Add Timer
            </button>

            <div className="flex items-center gap-2">
              <Filter
                className={`w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`px-3 py-2 sm:py-3 rounded-lg border text-sm sm:text-base flex-1 sm:flex-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">All Categories</option>
                {state.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className={`text-xs sm:text-sm text-center sm:text-right ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {state.timers.length} timers total
          </div>
        </div>

        {/* Empty State for filtered category */}
        <EmptyState
          icon={Clock}
          title={`No timers in ${
            categoryFilter === "all" ? "any category" : categoryFilter
          }`}
          description={`There are no timers ${
            categoryFilter === "all"
              ? "available"
              : `in the "${categoryFilter}" category`
          }. Try selecting a different category or create a new timer.`}
          buttonText="Add Timer"
          onButtonClick={() => setShowAddTimer(true)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <button
            onClick={() => setShowAddTimer(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Add Timer
          </button>

          <div className="flex items-center gap-2">
            <Filter
              className={`w-4 h-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-3 py-2 sm:py-3 rounded-lg border text-sm sm:text-base flex-1 sm:flex-none ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="all">All Categories</option>
              {state.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className={`text-xs sm:text-sm text-center sm:text-right ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {state.timers.length} timers total
        </div>
      </div>

      {/* Timer Categories */}
      <div className="space-y-3 sm:space-y-4">
        {timersByCategory.map((category) => (
          <TimerCategory
            key={category.name}
            category={category}
            darkMode={darkMode}
            expanded={expandedCategories.has(category.name)}
            onToggle={() => toggleCategory(category.name)}
            onBulkAction={handleBulkAction}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
          />
        ))}
      </div>
    </div>
  );
};

export default TimerList;
