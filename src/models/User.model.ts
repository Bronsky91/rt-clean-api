import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// Static methods
UserSchema.statics.findMyCompany = async function(id: number) {
  return this.findById(id).populate("company").exec()
}

// Export the model and return your IUser interface
export default model<IUser>('User', UserSchema);