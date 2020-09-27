import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";

import { paramMissingError } from "@shared/constants";
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
    failureRedirect: "/", // TODO: Update Failure redirect
  }),
  async (req: Request, res: Response) => {
    const { profile } = req.user as GoogleUser;
    const user: IUser | null = await UserModel.findOne({
      providerId: profile.id,
    });
    if (user) {
      //TODO: Do something with User
    } else {
      const verifiedEmail =
        profile.emails.find((email: any) => email.verified) ||
        profile.emails[0];

      //TODO: Do something with created User
      const createdUser = await UserModel.create({
        provider: profile.provider,
        providerId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: verifiedEmail.value,
      });
    }

    res.redirect(`http://localhost:3000/`);
  }
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
