import jwt from "jsonwebtoken";
import User from "../models/authModels.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ msg: "No Cookie Found" });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    if (!payload) {
      return res.json({
        msg: "Invalid Token",
      });
    }

    const user = await User.findById(payload.user._id);

    if (!user) {
      return res.json({
        msg: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error verifying token", error.message);
  }
};

export default verifyToken;
