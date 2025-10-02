import path from "path";
import fs from "fs/promises";
import { Jimp } from "jimp";
import HttpError from "../helpers/HttpError.js";
import { AVATARS_PATH } from "../constants/index.js";
import { User } from "../models/user.js";

export const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: oldPath, originalname } = req.file;
  const newPath = path.join(AVATARS_PATH, originalname);
  try {
    const image = await Jimp.read(oldPath);
    console.log("image", image);
    image.resize({ w: 250, h: 250 });
    await image.write(newPath);
    await fs.unlink(oldPath);
    // await fs.rename(oldPath, newPath);

    const avatarURL = path.join("avatars", originalname);

    const newUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );
    if (!newUser) {
      throw HttpError(404, "User not found");
    }
    res.json({
      avatarURL: newUser.avatarURL,
    });
  } catch (error) {
    await fs.unlink(oldPath).catch((err) => console.log(err));
    next(error);
  }
};
