import express from "express";
import game from "./game";
import leaderboard from "./leaderboard";

const router = express.Router();
router.use("/game", game);
router.use("/leaderboard", leaderboard);

export default router;
