import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard').then((response) => {
      setLeaderboard(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((player: any, index: number) => (
          <li key={index}>
            {index + 1}. {player.name} - {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
