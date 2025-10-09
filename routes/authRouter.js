import express from "express";
import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import {
  userSignupSchema,
  userSigninSchema,
  verifyEmailSchema,
} from "../schemas/userSchemas.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  upload.single("avatarURL"),
  validateBody(userSignupSchema),
  authController.signup
);
authRouter.get("/verify/:verificationToken", authController.verifyEmail);
authRouter.post(
  "/verify",
  validateBody(verifyEmailSchema),
  authController.resendVerifyEmail
);
authRouter.post(
  "/signin",
  validateBody(userSigninSchema),
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
