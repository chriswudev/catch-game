import React from "react";
import { Link } from "react-router-dom";

const StartMenu: React.FC = () => {
  return (
    <div className="text-center pt-8">
      <h1 className="text-6xl text-red-600">Catch Game</h1>
      <div className="text-4xl text-sky-600 mt-4">
        <Link to="/game" className="hover:text-orange-400">
          Start Game
        </Link>
        <Link to="/leaderboard" className="pl-12 hover:text-orange-400">
          Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default StartMenu;
