import fs from "fs/promises";
import path from "path";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");
console.log(avatarsPath);

const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.file);
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const { path: oldPath, originalname } = req.file;
  const newPath = path.join(avatarsPath, originalname);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", originalname);
  console.log(avatarURL);

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

const signin = async (req, res) => {
  // try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  // console.log(token);
  // const decodeToken = jwt.decode(token);
  // console.log(decodeToken);
  await User.findByIdAndUpdate(user._id, { token });
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    console.log(id);
  } catch (error) {
    console.log(error.message);
  }
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
  // } catch (error) {
  //   next(error);
  // }
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No content" });
};

export default { signup, signin, getCurrent, logout };
