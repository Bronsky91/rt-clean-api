import UserModel from "src/models/User.model";

export const createDatabaseName = async (lastName: string): Promise<string> => {
  const databaseName = lastName + "_" + Math.random().toString(36).substr(2, 9);
  const user = await UserModel.findOne({ where: { databaseName } });
  if (user) {
    return await createDatabaseName(user.lastName);
  }
  return databaseName;
};
