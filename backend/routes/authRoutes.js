import express from "express";
import { signup, signin, logout } from "../controllers/authContoller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/logout", logout);

export default router;
