import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const CatchGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  const handleCatchItem = (isPositive: boolean) => {
    setScore((prevScore) => prevScore + (isPositive ? 50 : -100));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      const endGame = () => {
        const name = prompt("Game Over! Enter your name:");
        if (name) {
          axios.post("/api/game/end", { userId: name, score }).then(() => {
            navigate("/leaderboard");
          });
        }
      };
      endGame();
    }
  }, [time, score, navigate]);

  return (
    <div>
      <h1>Catch Game</h1>
      <p>Time Left: {time} seconds</p>
      <p>Score: {score}</p>
      <div>
        <FaArrowLeft onClick={() => handleCatchItem(false)} />
        <FaArrowRight onClick={() => handleCatchItem(true)} />
      </div>
    </div>
  );
};

export default CatchGame;
