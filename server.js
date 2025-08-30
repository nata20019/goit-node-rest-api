import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://Nata:wbP5G2yXRPtSwgl7@cluster0.7obljfi.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
// mongodb+srv://Nata:wbP5G2yXRPtSwgl7@cluster0.7obljfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// wbP5G2yXRPtSwgl7
