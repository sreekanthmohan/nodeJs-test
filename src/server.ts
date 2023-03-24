import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import laptopRoutes from "./routes/Laptop";
import employeeRoutes from "./routes/Employee";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => console.error(error));

const StartServer = () => {
  router.use((req, res, next) => {
    console.log(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      console.log(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  router.use("/laptop", laptopRoutes);
  router.use("/employee", employeeRoutes);
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "pong" })
  );
  router.use((req, res, next) => {
    const error = new Error("Not found");
    console.error(error);
    res.status(404).json({
      message: error.message,
    });
  });
  http
    .createServer(router)
    .listen(config.server.port, () =>
      console.log(`Server is running on port ${config.server.port}`)
    );
};
