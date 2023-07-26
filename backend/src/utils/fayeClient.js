const Faye = require('faye');

const fayeClient = new Faye.Client('http://localhost:8000/faye');

exports.publishLeaderboardUpdate = (data) => {
  fayeClient.publish('/leaderboard', data);
};
