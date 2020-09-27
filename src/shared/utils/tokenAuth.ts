import { IUser } from "src/models/User.model";
import jwt from "jsonwebtoken";
import { CLIENT_LOGIN_PAGE_URL, JWT_SECRET } from "@shared/constants";
import { NextFunction, Request, Response } from "express";

// Middleware to check if the user is authenticated
export const isTokenAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.jwt;
  if (token) {
    const user: IUser = verifyToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect(CLIENT_LOGIN_PAGE_URL, 401);
    }
  } else {
    res.redirect(CLIENT_LOGIN_PAGE_URL, 401);
  }
};

export const signToken = (user: IUser) => {
  return jwt.sign({ data: user }, JWT_SECRET, {
    expiresIn: 604800,
  });
};

const verifyToken = (token: string): IUser => {
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  const user: IUser = decoded.data as IUser;
  return user;
};
