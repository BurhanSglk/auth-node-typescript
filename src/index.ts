import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./router";

const app = express();

dotenv.config();

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// const server = http.createServer(app);

// server.listen(process.env.PORT, () => {
//   console.log("Server started on port 8080");
// });

// mongoose.Promise = Promise;

app.use("/", router());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server Port: ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));
