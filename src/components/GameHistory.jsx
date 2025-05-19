import React from "react";

const GameHistory = ({ history }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-blue-600 mb-3">Game History</h2>

      <div className="max-h-40 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No games played yet
          </p>
        ) : (
          <ul className="space-y-2">
            {history.map((game, index) => (
              <li
                key={index}
                className={`
                  p-2 rounded flex justify-between items-center
                  ${
                    game.result === "win"
                      ? "bg-green-50"
                      : game.result === "loss"
                      ? "bg-red-50"
                      : "bg-orange-50"
                  }
                `}
              >
                <span>
                  Game #{history.length - index} -
                  <span
                    className={`font-bold ${
                      game.result === "win"
                        ? "text-green-600"
                        : game.result === "loss"
                        ? "text-red-600"
                        : "text-orange-500"
                    }`}
                  >
                    {game.result === "win"
                      ? "Win"
                      : game.result === "loss"
                      ? "Loss"
                      : "Draw"}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({game.difficulty})
                  </span>
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(game.timestamp).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
