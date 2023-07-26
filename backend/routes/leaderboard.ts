import express from "express";
import { PrismaClient } from "@prisma/client";
// const pubsub = require('../services/pubsub');

const router = express.Router();
const prisma = new PrismaClient();

// API to get leaderboard data
router.get("/", async (req, res) => {
  // Fetch the top 100 players from the database and return as JSON
});

// API to subscribe to real-time leaderboard updates
router.post("/subscribe", (req, res) => {
  // Subscribe to Faye channel for real-time updates
});

export default router;
