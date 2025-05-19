import React from "react";

const DifficultySelector = ({ difficulty, onChange }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow w-full max-w-md">
      <h2 className="text-lg font-bold text-blue-600 mb-2">Difficulty Level</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => onChange("easy")}
          className={`flex-1 py-2 px-4 rounded transition-colors ${
            difficulty === "easy"
              ? "bg-green-500 text-white font-bold"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => onChange("medium")}
          className={`flex-1 py-2 px-4 rounded transition-colors ${
            difficulty === "medium"
              ? "bg-yellow-500 text-white font-bold"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => onChange("hard")}
          className={`flex-1 py-2 px-4 rounded transition-colors ${
            difficulty === "hard"
              ? "bg-red-500 text-white font-bold"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultySelector;
