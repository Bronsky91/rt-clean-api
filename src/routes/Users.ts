import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";

import { CLIENT_HOME_PAGE_URL, paramMissingError } from "@shared/constants";
import UserModel, { IUser } from "src/models/User.model";
import passport from "passport";
import { GoogleProfile, GoogleUser } from "src/interfaces/google.interface";
import { createDatabaseName } from "../shared/utils/createDatabaseName";
// Init shared
const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  const users: IUser[] = await UserModel.find();
  return res.status(OK).json({ users });
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }

  await UserModel.create(user);

  return res.status(CREATED).end();
});

router.get(
  "/auth",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "http://localhost:3000/", // TODO: Update Failure redirect
  })
);

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put("/update", async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  user.id = Number(user.id);
  return res.status(OK).end();
});

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params as ParamsDictionary;
  return res.status(OK).end();
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
