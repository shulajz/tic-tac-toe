import React, { useState, useEffect } from "react";
import DifficultySelector from "./components/DifficultySelector";
import GameBoard from "./components/GameBoard";
import ResetButton from "./components/ResetButton";
import PlayerInfo from "./components/PlayerInfo";
import GameStats from "./components/GameStats";
import GameHistory from "./components/GameHistory";
import { calculateWinner, findWinningMove } from "./utils/gameLogic";

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, playerWon, computerWon, draw
  const [winningCells, setWinningCells] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [moveCount, setMoveCount] = useState(0);

  // Stats tracking - load from localStorage if available
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("ticTacToeStats");
    return savedStats
      ? JSON.parse(savedStats)
      : {
          wins: 0,
          losses: 0,
          draws: 0,
          totalGames: 0,
        };
  });

  // Game history - load from localStorage if available
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("ticTacToeHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save to localStorage whenever stats or history changes
  useEffect(() => {
    localStorage.setItem("ticTacToeStats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("ticTacToeHistory", JSON.stringify(history));
  }, [history]);

  const handleClick = (index) => {
    // Return if the cell is filled or game is over
    if (board[index] || gameStatus !== "playing") return;

    // Update board with player's move
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setMoveCount(moveCount + 1);
    setIsXNext(false);

    // Check if player won
    const winner = calculateWinner(newBoard);
    if (winner) {
      handleGameEnd("win");
      setGameStatus("playerWon");
      setWinningCells(winner.line);
      return;
    }

    // Check for draw
    if (moveCount + 1 === 9) {
      handleGameEnd("draw");
      setGameStatus("draw");
      return;
    }
  };

  // Computer's move with simple AI
  useEffect(() => {
    if (!isXNext && gameStatus === "playing") {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameStatus]);

  // Make computer move based on difficulty
  const makeComputerMove = () => {
    const newBoard = [...board];

    // Set AI strategy based on difficulty
    if (difficulty === "easy") {
      // Easy mode: Random moves only
      const availableMoves = [];
      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) availableMoves.push(i);
      }
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      newBoard[availableMoves[randomIndex]] = "O";
    } else if (difficulty === "medium") {
      // Medium mode: Sometimes makes optimal moves, sometimes random
      const shouldMakeOptimalMove = Math.random() < 0.7;

      if (shouldMakeOptimalMove) {
        // Check if computer can win
        const computerWinMove = findWinningMove(newBoard, "O");
        if (computerWinMove !== -1) {
          newBoard[computerWinMove] = "O";
        } else {
          // Block player's winning move
          const blockMove = findWinningMove(newBoard, "X");
          if (blockMove !== -1) {
            newBoard[blockMove] = "O";
          } else {
            // Take center if available, otherwise random
            if (!newBoard[4]) {
              newBoard[4] = "O";
            } else {
              const availableMoves = [];
              for (let i = 0; i < 9; i++) {
                if (!newBoard[i]) availableMoves.push(i);
              }
              const randomIndex = Math.floor(
                Math.random() * availableMoves.length
              );
              newBoard[availableMoves[randomIndex]] = "O";
            }
          }
        }
      } else {
        // Make random move
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
          if (!newBoard[i]) availableMoves.push(i);
        }
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        newBoard[availableMoves[randomIndex]] = "O";
      }
    } else {
      // Hard mode: Always makes optimal moves
      // Check if computer can win
      const computerWinMove = findWinningMove(newBoard, "O");
      if (computerWinMove !== -1) {
        newBoard[computerWinMove] = "O";
      } else {
        // Block player's winning move
        const blockMove = findWinningMove(newBoard, "X");
        if (blockMove !== -1) {
          newBoard[blockMove] = "O";
        } else {
          // Strategic moves in priority order:
          // 1. Take center
          if (!newBoard[4]) {
            newBoard[4] = "O";
          }
          // 2. Take a corner if available
          else if (!newBoard[0]) {
            newBoard[0] = "O";
          } else if (!newBoard[2]) {
            newBoard[2] = "O";
          } else if (!newBoard[6]) {
            newBoard[6] = "O";
          } else if (!newBoard[8]) {
            newBoard[8] = "O";
          }
          // 3. Take any available space
          else {
            const availableMoves = [];
            for (let i = 0; i < 9; i++) {
              if (!newBoard[i]) availableMoves.push(i);
            }
            const randomIndex = Math.floor(
              Math.random() * availableMoves.length
            );
            newBoard[availableMoves[randomIndex]] = "O";
          }
        }
      }
    }

    setBoard(newBoard);
    setMoveCount(moveCount + 1);
    setIsXNext(true);

    // Check if computer won
    const winner = calculateWinner(newBoard);
    if (winner) {
      handleGameEnd("loss");
      setGameStatus("computerWon");
      setWinningCells(winner.line);
      return;
    }

    // Check for draw
    if (moveCount + 1 === 9) {
      handleGameEnd("draw");
      setGameStatus("draw");
      return;
    }
  };

  // Handle game end
  const handleGameEnd = (result) => {
    const newStats = { ...stats };
    const gameRecord = {
      result,
      difficulty,
      timestamp: new Date().toISOString(),
    };

    if (result === "win") {
      newStats.wins += 1;
    } else if (result === "loss") {
      newStats.losses += 1;
    } else {
      newStats.draws += 1;
    }

    newStats.totalGames += 1;

    setStats(newStats);
    setHistory([gameRecord, ...history.slice(0, 19)]); // Keep only last 20 games
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("playing");
    setWinningCells([]);
    setMoveCount(0);
  };

  // Handle difficulty change
  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Tic Tac Toe</h1>

        <DifficultySelector
          difficulty={difficulty}
          onChange={handleDifficultyChange}
        />

        <GameBoard
          board={board}
          gameStatus={gameStatus}
          winningCells={winningCells}
          isXNext={isXNext}
          onCellClick={handleClick}
        />

        <ResetButton onClick={resetGame} />

        <PlayerInfo />

        <GameStats stats={stats} />

        <GameHistory history={history} />
      </div>
    </div>
  );
};

export default TicTacToeGame;
