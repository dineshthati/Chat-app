import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (user, res) => {
  const { username, fullName, gender } = user;
  const payload = { username, fullName, gender };
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secretKey);
  console.log(token);
  return res.cookie("token", token);
};

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const payload = jwt.verify(token, secretKey);
  return payload;
};

export default generateTokenAndSetCookie;
