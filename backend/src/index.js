const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameController = require('./controllers/gameController');
const fayeClient = require('./utils/fayeClient');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/game', async (req, res) => {
  const { userId, score } = req.body;
  try {
    await gameController.createGame(userId, score);
    fayeClient.publishLeaderboardUpdate({ userId, score });
    res.status(201).json({ message: 'Game created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the game.' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await gameController.getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
