import React from 'react';
import { Link } from 'react-router-dom';

const StartMenu: React.FC = () => {
  return (
    <div>
      <h1>Catch Game</h1>
      <Link to="/game">Start Game</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  );
};

export default StartMenu;
