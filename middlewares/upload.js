import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `$${uniquePrefix}_${file.originalname}`;
    console.log(file.originalname);
    cb(null, filename);
  },
});
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return cb(HttpError(400, "exe files are not allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
