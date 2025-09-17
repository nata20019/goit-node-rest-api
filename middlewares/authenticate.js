import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = User.findById(id);
    // if (!user || !user.token || user.token !== token) {
    //   throw HttpError(401, "Not authorized");
    // }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};
export default authenticate;
