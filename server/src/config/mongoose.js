import mongoose from "mongoose";
import logger from "./logger.js";

// Exit application on error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

export const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoDB connected..."));
  return mongoose.connection;
};
