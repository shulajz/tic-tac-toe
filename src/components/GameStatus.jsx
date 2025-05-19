import React from "react";

const GameStatus = ({ gameStatus, isXNext }) => {
  // Render game status message
  const renderStatusMessage = () => {
    switch (gameStatus) {
      case "playerWon":
        return "You won! 🎉";
      case "computerWon":
        return "Computer won!";
      case "draw":
        return "It's a draw!";
      default:
        return isXNext ? "Your turn" : "Computer is thinking...";
    }
  };

  // Get status text color
  const getStatusColor = () => {
    switch (gameStatus) {
      case "playerWon":
        return "text-green-600";
      case "computerWon":
        return "text-red-600";
      case "draw":
        return "text-orange-500";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className={`mb-4 text-center font-bold ${getStatusColor()}`}>
      {renderStatusMessage()}
    </div>
  );
};

export default GameStatus;
