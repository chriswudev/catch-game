// const express = require("express");
import express from "express";
// const game = require("./game");
import game from "./game";
import leaderboard from "./leaderboard";
// const leaderboard = require("./leaderboard");

const router = express.Router();
router.use("/game", game);
router.use("/leaderboard", leaderboard);

export default router;
