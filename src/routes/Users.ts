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
import { isTokenAuth, signToken } from "@shared/utils/tokenAuth";
import { authRedtail } from "src/rt-api/auth";
import { AxiosResponse } from "axios";
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
 *     Updates User with Redtail Userkey - "POST /api/users/redtail-auth
 ******************************************************************************/

router.post(
  "/redtail-auth",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;
    const { username, password } = req.body.data;

    const authStatus = await authRedtail(username, password)
      .then((rtResponse) => {
        const rtUserkey = rtResponse.data["UserKey"];

        UserModel.updateOne(
          { email: user.email },
          { $set: { rtUserkey } }
        ).exec();

        return rtResponse.status;
      })
      .catch((rt) => rt.response.status);

    res.status(authStatus).end();
  }
);

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
