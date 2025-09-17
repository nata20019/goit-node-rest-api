import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    subscription: newUser.subscription,
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
  // await User.findByIdAndUpdate(user._id, { token });
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    console.log(id);
  } catch (error) {
    console.log(error.message);
  }
  res.json({
    token,
  });
  // } catch (error) {
  //   next(error);
  // }
};
export default { signup, signin };
