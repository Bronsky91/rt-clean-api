import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import {
  CLIENT_HOME_PAGE_URL,
  CLIENT_LOGIN_PAGE_URL,
  paramMissingError,
} from "@shared/constants";
import UserModel, { IUser } from "src/models/User.model";
import { GoogleUser } from "src/interfaces/google.interface";
import { findOrCreateGoogleUser } from "../shared/utils/findOrCreateGoogleUser";
import { signToken } from "@shared/utils/tokenAuth";
// Init shared
const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  const users: IUser[] = await UserModel.find();
  return res.status(StatusCodes.OK).json({ users });
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: paramMissingError,
    });
  }

  await UserModel.create(user);

  return res.status(StatusCodes.CREATED).end();
});

router.get(
  "/auth",
  passport.authenticate("google", {
    failureRedirect: CLIENT_LOGIN_PAGE_URL,
  }),
  async (req: Request, res: Response) => {
    const { profile } = req.user as GoogleUser;

    const user: IUser = await findOrCreateGoogleUser(profile);

    return res
      .status(200)
      .cookie("jwt", signToken(user), {
        httpOnly: true,
      })
      .redirect(CLIENT_HOME_PAGE_URL);
  }
);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
