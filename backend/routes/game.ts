import express from "express";
import { PrismaClient } from "@prisma/client";
// const pubsub = require('../services/pubsub');

const router = express.Router();
const prisma = new PrismaClient();

// API to start a new game
router.post("/start", async (req, res) => {
  // Implement game start logic and return initial items
});

// API to end the game and save user score
router.post("/end", async (req, res) => {
  // Save user score and name to the database
  // Publish leaderboard update to Faye channel
});

export default router;
