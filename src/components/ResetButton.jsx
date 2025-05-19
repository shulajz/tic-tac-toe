import React from "react";

const ResetButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-400 
        text-white font-bold rounded shadow-md 
        hover:from-blue-600 hover:to-blue-500 transition-colors duration-300"
    >
      New Game
    </button>
  );
};

export default ResetButton;
