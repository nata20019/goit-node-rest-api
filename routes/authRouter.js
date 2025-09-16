import express from "express";
import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSingupSchema, userSinginSchema } from "../schemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(userSingupSchema),
  authController.signup
);
authRouter.post(
  "/signin",
  validateBody(userSinginSchema),
  authController.signin
);

export default authRouter;
