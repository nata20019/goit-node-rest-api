import express from "express";
import { updateUserAvatar } from "../controllers/usersControllers.js";
import upload from "../middlewares/upload.js";
import authenticate from "../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateUserAvatar
);

export default usersRouter;
