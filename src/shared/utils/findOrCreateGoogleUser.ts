import { GoogleProfile } from "src/interfaces/google.interface";
import UserModel, { IUser } from "src/models/User.model";
import { v4 as uuid } from 'uuid';

export const findOrCreateGoogleUser = async (
  profile: GoogleProfile
): Promise<IUser> => {
  const foundUser: IUser | null = await UserModel.findOne({
    providerId: profile.id,
  });

  if (foundUser !== null) {
    return foundUser;
  }

  const verifiedEmail =
    profile.emails.find((email: any) => email.verified) || profile.emails[0];

  const databaseName: string = uuid();

  const createdUser: IUser = await UserModel.create({
    provider: profile.provider,
    providerId: profile.id,
    displayName: profile.displayName,
    email: verifiedEmail.value,
    databaseName,
  });

  return createdUser;
};
