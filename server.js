import mongoose from "mongoose";

const DB_HOST = process.env.DB_HOST;

console.log(DB_HOST);
console.log(process.env.DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Server is running. Use our API on port: 3000");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
// mongodb+srv://Nata:wbP5G2yXRPtSwgl7@cluster0.7obljfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// wbP5G2yXRPtSwgl7
