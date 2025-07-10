import React from "react";
import { Download, History as HistoryIcon } from "lucide-react";
import EmptyState from "../Common/EmptyState";
import { formatTime } from "../../utils/timerHelpers";

const History = ({ history, darkMode, exportData }) => {
  if (history.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Timer History
          </h2>
          <button
            onClick={exportData}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        <EmptyState
          icon={HistoryIcon}
          title="No completed timers yet"
          description="Complete some timers to see them here"
          darkMode={darkMode}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Timer History
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {history.length} completed timer{history.length !== 1 ? "s" : ""}
          </div>
          <button
            onClick={exportData}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      <div
        className={`rounded-lg shadow-sm border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr
                className={`border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <th
                  className={`text-left p-3 sm:p-4 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Timer Name
                </th>
                <th
                  className={`text-left p-3 sm:p-4 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Category
                </th>
                <th
                  className={`text-left p-3 sm:p-4 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Duration
                </th>
                <th
                  className={`text-left p-3 sm:p-4 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  } hidden sm:table-cell`}
                >
                  Completed At
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr
                  key={entry.id}
                  className={`border-b last:border-b-0 transition-colors ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td
                    className={`p-3 sm:p-4 font-medium text-sm sm:text-base ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {entry.name}
                  </td>
                  <td className="p-3 sm:p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                        darkMode
                          ? "bg-blue-800 text-blue-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {entry.category}
                    </span>
                  </td>
                  <td
                    className={`p-3 sm:p-4 font-mono text-sm sm:text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {formatTime(entry.duration)}
                  </td>
                  <td
                    className={`p-3 sm:p-4 text-xs sm:text-sm hidden sm:table-cell ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {entry.completionTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
