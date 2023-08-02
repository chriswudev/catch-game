import express from "express";
import { getLeaderboard } from "../services/game";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard(100);
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the leaderboard." });
  }
});

export default router;
