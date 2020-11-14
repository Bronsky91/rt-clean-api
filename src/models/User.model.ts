import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  displayName?: string;
  databaseName?: string;
  rtUserkey?: string;
  provider?: string;
  providerId?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: false },
  rtUserkey: { type: String, required: false },
  provider: { type: String, required: false },
  providerId: { type: String, required: false },
});

// Export the model and return your IUser interface
export default model<IUser>("User", UserSchema);
