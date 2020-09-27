import { OAuth2Strategy } from "passport-google-oauth";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} from "./constants";
import UserModel, { IUser } from "src/models/User.model";
import { GoogleProfile } from "src/interfaces/google.interface";

export default module.exports = () => {
  passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new OAuth2Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_REDIRECT_URL,
      },
      (token, refreshToken, profile, done) => {
        UserModel.findOne({
          providerId: profile.id,
        }).then((user) => {
          if (user) {
            done(null, user);
          } else {
            if (profile.name && profile.emails) {
              const verifiedEmail =
                profile.emails.find((email: any) => email.verified) ||
                profile.emails[0];

              UserModel.create({
                provider: profile.provider,
                providerId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: verifiedEmail.value,
              }).then((newUser) => done(null, newUser));
            }
          }
        });
      }
    )
  );
};
