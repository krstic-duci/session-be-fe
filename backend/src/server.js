import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connectStore from "connect-mongo";
const chalk = require("chalk");

import {
  PORT,
  NODE_ENV,
  MONGO_URI,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
} from "./config";
import { userRoutes, sessionRoutes } from "./routes";

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.bgCyan.black("MongoDB connected"));

    const app = express();
    const MongoStore = connectStore(session);

    app.disable("x-powered-by");

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "session",
          ttl: parseInt(SESS_LIFETIME) / 1000,
        }),
        cookie: {
          sameSite: true,
          secure: NODE_ENV === "production",
          maxAge: parseInt(SESS_LIFETIME),
        },
      })
    );

    const apiRouter = express.Router();
    app.use("/api", apiRouter);
    apiRouter.use("/users", userRoutes);
    apiRouter.use("/session", sessionRoutes);

    app.listen(PORT, () =>
      console.log(chalk.bgCyan.black(`Listening on http://localhost:${PORT}`))
    );
  } catch (error) {
    console.error(error, "Something is wrong with backend/src/server.js file");
  }
})();

export {};
