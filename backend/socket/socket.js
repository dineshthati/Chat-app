import { Server } from "socket.io";

import http, { METHODS } from "http";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"], methods: ["GET", "POST"] },
});

const userSocketmap = {};

io.on("connection", (socket) => {
  console.log("A user connceted", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketmap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    console.log("A user disconnceted", socket.id);
    delete userSocketmap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

export { app, io, server };
