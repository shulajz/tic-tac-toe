import React from "react";

const GameCell = ({ value, index, winningCells, gameStatus, onClick }) => {
  // Get cell background color based on status
  const getCellColor = () => {
    if (winningCells.includes(index)) {
      return value === "X" ? "bg-green-500" : "bg-red-500";
    }
    return "bg-white";
  };

  // Get text color for X and O
  const getTextColor = () => {
    if (winningCells.includes(index)) {
      return "text-white";
    }
    return value === "X" ? "text-blue-600" : "text-red-600";
  };

  return (
    <div
      onClick={onClick}
      className={`
        h-24 w-24 flex justify-center items-center 
        shadow rounded cursor-pointer
        transition-all duration-300 transform
        ${getCellColor()}
        ${
          !value && gameStatus === "playing"
            ? "hover:bg-blue-50 hover:scale-105"
            : ""
        }
      `}
    >
      {value && (
        <span className={`text-4xl font-bold ${getTextColor()}`}>{value}</span>
      )}
    </div>
  );
};

export default GameCell;
