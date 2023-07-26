// src/services/pubsub.ts
const Faye = require("faye-websocket");

const client = new Faye.Client("/faye");

export default client;
