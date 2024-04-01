import User from "../models/authModels.js";
import { createHmac, randomBytes } from "crypto";
import generateTokenAndSetCookie from "../utils/authJwt.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.json({
        msg: "User already exist",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        msg: "password and confirm password doesnt match",
      });
    }

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      gender,
      salt: salt,
      profilePhotoUrl:
        gender == "male"
          ? `https://avatar.iran.liara.run/public/boy?username=${username}`
          : `https://avatar.iran.liara.run/public/girl?username=${username}`,
    });
    generateTokenAndSetCookie(newUser, res);
    res.json({
      msg: "User created succefully",
    });

    console.log(newUser);
  } catch (e) {
    res.json({
      msg: "Error in signing controller",
      eroor: e,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    console.log(user);
    generateTokenAndSetCookie(user, res);
    if (!user) {
      return res.json({
        msg: "User not found , Signup first",
      });
    }
    const salt = user.salt;

    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (user.password == hashedPassword) {
      return res.json({
        msg: "Login Success",
      });
    } else {
      return res.json({
        msg: "Login Failed",
      });
    }
  } catch (error) {
    return res.json({
      msg: "Error in login controller",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "");
  return res.json({
    msg: "Logout suucessfull",
  });
};