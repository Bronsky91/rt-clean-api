import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";

import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "./shared/Logger";
import { MONGO_URL } from "./shared/constants";
import auth from "./shared/auth";
import passport from "passport";
import cookieSession from "cookie-session";

// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(passport.initialize());
app.use(passport.session()); // Used to persist login sessions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
    // useTempFiles : true,
    safeFileNames: true,
    // tempFileDir : './src/tmp-backups/',
    preserveExtension: true,
  })
);
// cookieSession config
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["funeveryday"], // TODO: Make random string
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/api", BaseRouter);

auth();
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: err.message,
  });
});

// Connect to Mongoose
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Export express instance
export default app;
