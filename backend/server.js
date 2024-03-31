import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
