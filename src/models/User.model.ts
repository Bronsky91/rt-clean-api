import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  provider?: string;
  providerId?: string;
  displayName?: string;
  databaseName?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  provider: { type: String, required: false },
  providerId: { type: String, required: false },
  displayName: { type: String, required: false },
  databaseName: { type: String, required: false, unique: true },
});

// Export the model and return your IUser interface
export default model<IUser>("User", UserSchema);
