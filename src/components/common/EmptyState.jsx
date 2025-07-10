import React from "react";

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  darkMode,
}) => {
  return (
    <div className="text-center py-12">
      <Icon
        className={`w-16 h-16 mx-auto mb-4 ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}
      />
      <h3
        className={`text-lg font-semibold mb-2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {title}
      </h3>
      <p className={`mb-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
        {description}
      </p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
