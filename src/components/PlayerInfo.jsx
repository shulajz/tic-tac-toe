import React from "react";

const PlayerInfo = () => {
  return (
    <div className="mt-6 text-gray-600 text-center">
      <div>
        You: <span className="text-blue-600 font-bold">X</span>
      </div>
      <div>
        Computer: <span className="text-red-600 font-bold">O</span>
      </div>
    </div>
  );
};

export default PlayerInfo;
