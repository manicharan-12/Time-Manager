import React, { useState } from "react";

const AddTimerModal = ({ darkMode, categories, onAdd, onClose }) => {
  const [newTimer, setNewTimer] = useState({
    name: "",
    duration: 300,
    category: "Workout",
    halfwayAlert: false,
  });

  const handleAddTimer = () => {
    if (newTimer.name.trim()) {
      onAdd(newTimer);
      setNewTimer({
        name: "",
        duration: 300,
        category: "Workout",
        halfwayAlert: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto`}
      >
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          Add New Timer
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">
              Timer Name
            </label>
            <input
              type="text"
              value={newTimer.name}
              onChange={(e) =>
                setNewTimer({ ...newTimer, name: e.target.value })
              }
              className={`w-full px-3 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter timer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={newTimer.duration}
              onChange={(e) =>
                setNewTimer({
                  ...newTimer,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className={`w-full px-3 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">
              Category
            </label>
            <select
              value={newTimer.category}
              onChange={(e) =>
                setNewTimer({ ...newTimer, category: e.target.value })
              }
              className={`w-full px-3 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="checkbox"
              id="halfwayAlert"
              checked={newTimer.halfwayAlert}
              onChange={(e) =>
                setNewTimer({ ...newTimer, halfwayAlert: e.target.checked })
              }
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="halfwayAlert" className="text-sm sm:text-base">
              Enable halfway alert
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
          <button
            onClick={handleAddTimer}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors order-2 sm:order-1"
          >
            Add Timer
          </button>
          <button
            onClick={onClose}
            className={`flex-1 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            } py-2 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors order-1 sm:order-2`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTimerModal;
