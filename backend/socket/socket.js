import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = {
      socketId: socket.id,
      userId: userId,
    };
  }

  // Get the list of online users
  const onlineUsers = Object.values(userSocketMap);
  io.emit("getOnlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    const user = Object.values(userSocketMap).find(
      (u) => u.socketId === socket.id
    );
    if (user) {
      delete userSocketMap[user.userId];
      io.emit("getOnlineUsers", Object.values(userSocketMap));
    }
  });
});

export { app, io, server };
