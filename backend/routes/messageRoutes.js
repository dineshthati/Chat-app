import express from "express";
import {
  getMessages,
  messageController,
} from "../controllers/messageController.js";
import verifyToken from "../utils/protectRoute.js";

const router = express.Router();

router.get("/:id", getMessages);
router.post("/send/:id", messageController);

export default router;
