import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "socket.io-client";

const socket = connect(
  process.env.REACT_APP_SERVER_URL || "http://localhost:5000"
);

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    socket.on("leaderboardUpdate", (leaderboard) => {
      setLeaderboard(leaderboard);
    });

    axios.get("/api/leaderboard").then((response) => {
      setLeaderboard(response.data);
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

  return (
    <div className="game-container bg-img-2 flex justify-center pt-4 text-white">
      <ul>
        {leaderboard.map(
          (player: { userId: string; score: number }, index: number) => (
            <li key={index}>
              {index + 1}. {player.userId} - {player.score}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
