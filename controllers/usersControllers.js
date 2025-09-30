import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { AVATARS_PATH } from "../constants/index.js";
import { User } from "../models/user.js";

export const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, originalname } = req.file;
  const newPath = path.join(AVATARS_PATH, originalname);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", originalname);

  const newUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );
  res.json({
    avatarURL: newUser.avatarURL,
  });
};
