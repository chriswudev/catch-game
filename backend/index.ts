import express from "express";
import http from "http";
import socket from "socket.io";
import cors from 'cors'
import routes from "./routes";

const app = express();
const server = http.createServer(app);

export const io = new socket.Server(server, {
  cors: {
    origin: process.env.APP_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api", routes);

io.on("connection", (socket) => {
  console.log("User connected.");

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
