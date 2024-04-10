import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (user, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ user }, secretKey);
  return res.cookie("token", token);
};

export default generateTokenAndSetCookie;
