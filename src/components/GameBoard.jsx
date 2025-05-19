import React from "react";
import GameStatus from "./GameStatus";
import GameCell from "./GameCell";

const GameBoard = ({
  board,
  gameStatus,
  winningCells,
  isXNext,
  onCellClick,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-lg mb-4 w-full max-w-md">
      <GameStatus gameStatus={gameStatus} isXNext={isXNext} />

      <div className="grid grid-cols-3 gap-2 w-full">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            index={index}
            winningCells={winningCells}
            gameStatus={gameStatus}
            onClick={() => onCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
