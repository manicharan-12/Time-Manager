import React from "react";
import { CheckCircle } from "lucide-react";

const CompletionModal = ({ darkMode, timer, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md lg:max-w-lg mx-2 sm:mx-4 text-center`}
      >
        <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-green-500 mb-3 sm:mb-4 md:mb-6" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
          Congratulations!
        </h3>
        <p
          className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          You've completed <strong className="break-words">{timer.name}</strong>
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg font-medium text-sm sm:text-base md:text-lg transition-colors w-full sm:w-auto"
        >
          Great!
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;
