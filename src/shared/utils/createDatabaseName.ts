import UserModel from "src/models/User.model";

export const createDatabaseName = async (firstName: string): Promise<string> => {
  const databaseName = firstName + "_" + Math.random().toString(36).substr(2, 9);
  const user = await UserModel.findOne({ where: { databaseName } });
  if (user) {
    return await createDatabaseName(user.firstName);
  }
  return databaseName;
};
