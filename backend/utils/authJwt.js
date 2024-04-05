import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (user, res) => {
  // const { username, fullName, gender, _id } = user;
  // const payload = { username, fullName, gender, _id };
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ user }, secretKey);
  console.log(token);
  return res.cookie("token", token);
};

export default generateTokenAndSetCookie;
