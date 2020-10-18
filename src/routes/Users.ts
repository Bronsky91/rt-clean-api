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
        console.log(rtResponse.data);
        const rtUserkey: string = rtResponse.data.authenticated_user.user_key;

        console.log(rtUserkey);

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

router.get(
  "/rt-auth-check",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;
    const dbUser = await UserModel.findOne({ email: user.email });
    res.json({ rtAuth: !!dbUser?.rtUserkey });
  }
);

router.get("/auth-check", isTokenAuth, async (req: Request, res: Response) => {
  try {
    const user: IUser = req.user as IUser;
    const dbUser = await UserModel.findOne({ email: user.email });
    res.json({ rtAuth: !!dbUser?.rtUserkey });
  } catch (e) {
    res.sendStatus(200);
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
