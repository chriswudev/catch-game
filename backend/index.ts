import express from 'express'
const http = require("http");
const faye = require("faye");
const fayeRedis = require("faye-redis");
import routes from './routes'

const app = express();
const server = http.createServer(app);

// Faye Pub/Sub setup with Redis
const fayeServer = new faye.NodeAdapter({
  mount: "/faye",
  timeout: 45,
});

fayeServer.attach(server, {
  extensions: [fayeRedis],
  ping: 10,
  interval: 10,
});

// Add middleware and routes
app.use(express.json());

// Implement API routes (POST /api/game/start, POST /api/game/end, GET /api/leaderboard, POST /api/leaderboard/subscribe)
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
