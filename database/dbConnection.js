import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "admission",
    })
    .then(() => {
      console.log("Connected to databaseeee!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
