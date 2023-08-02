import express from "express";
import { createGame, getLeaderboard } from "../services/game";
import { io } from "..";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, score } = req.body;
  try {
    const game = await createGame(userId, score);
    const allGames = await getLeaderboard(null);
    const ranking = allGames.findIndex(
      (item: { id: number; userId: string; score: number }) =>
        item.id === game.id
    );
    io.emit("leaderboardUpdate", allGames.slice(0, 100));
    res.json({ ranking: ranking + 1 });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the game." });
  }
});

export default router;
