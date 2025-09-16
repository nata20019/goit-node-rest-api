import Joi from "joi";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const userSignupSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(20).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(20).required(),
});
