import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!, {});
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB connected successfully!");
    });

    connection.on("error", (err) => {
      console.log("DB connection error. Please make sure DB is running." + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
