import { IUser } from "../../models/User.model";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../constants";

// Middleware to check if the user is authenticated
export const isTokenAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headersCookie = req.headers.cookie;
  const token: string | undefined = req.cookies.jwt || headersCookie;
  if (token) {
    const user: IUser = verifyToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

export const signToken = (user: IUser) => {
  return jwt.sign({ data: user }, JWT_SECRET, {
    expiresIn: "1 day",
  });
};

export const logoutToken = (user: IUser) => {
  return jwt.sign({ data: user }, JWT_SECRET, {
    expiresIn: "-10s",
  });
};

const verifyToken = (token: string): IUser => {
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  const user: IUser = decoded.data as IUser;
  return user;
};
