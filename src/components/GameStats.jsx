import React from "react";

const GameStats = ({ stats }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-blue-600 mb-3">Game Statistics</h2>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">Wins</p>
          <p className="text-2xl font-bold text-blue-600">{stats.wins}</p>
        </div>
        <div className="p-2 bg-red-50 rounded">
          <p className="text-sm text-gray-600">Losses</p>
          <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
        </div>
        <div className="p-2 bg-orange-50 rounded">
          <p className="text-sm text-gray-600">Draws</p>
          <p className="text-2xl font-bold text-orange-500">{stats.draws}</p>
        </div>
      </div>
      <div className="mt-3 bg-gray-50 p-2 rounded">
        <p className="text-sm text-gray-600 text-center">Win Rate</p>
        <p className="text-xl font-bold text-center text-purple-600">
          {stats.totalGames > 0
            ? Math.round((stats.wins / stats.totalGames) * 100) + "%"
            : "0%"}
        </p>
      </div>
    </div>
  );
};

export default GameStats;
