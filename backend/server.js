import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import verifyToken from "./utils/protectRoute.js";
import getUserRoute from "./routes/getUsersRoutes.js";

import dbConnect from "./models/dbConnect.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", verifyToken, messageRoutes);
app.use("/api/users", verifyToken, getUserRoute);

app.listen(PORT, () => {
  dbConnect();
  console.log(`server started at port ${PORT}`);
});
