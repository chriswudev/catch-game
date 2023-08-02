import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Game from "../models/game";
import axios from "axios";

const CatchGame: React.FC = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(60);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(650);
  const timer = useRef<NodeJS.Timer>();
  const game = useRef<Game>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer.current);
          if (game.current) {
            game.current.player.gameOver = true;
          }
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer.current);
  }, []);

  const keyDownListener = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      game.current?.player.moveLeft();
    } else if (e.key === "ArrowRight") {
      game.current?.player.moveRight();
    } else if (e.key === "Enter" && game.current?.player.gameOver === true) {
      game.current?.main();
      window.clearTimeout(timer.current);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      if (containerRect && containerRect.width && containerRect.height) {
        setWidth(containerRect.width);
        setHeight(containerRect.height);
        setTimeout(() => {
          game.current = new Game();
          game.current.main();
          window.addEventListener("keydown", keyDownListener);
        }, 100);
      }
    }
    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      const endGame = () => {
        const name = prompt("Game Over! Enter your name:");
        if (name) {
          axios
            .post("/api/game", {
              userId: name,
              score: game.current?.player.score,
            })
            .then((res) => {
              if (res && res.data && res.data.ranking) {
                alert(`Your ranking is ${res.data.ranking}`);
              }
              navigate("/leaderboard");
            });
        }
      };
      endGame();
    }
  }, [time, navigate]);

  return (
    <div className="game-container" ref={containerRef}>
      <canvas id="backgroundCanvas" width={width} height={height}></canvas>
      <canvas id="canvas" width={width} height={height}></canvas>
    </div>
  );
};

export default CatchGame;
