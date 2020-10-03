import { Schema, Document, model } from "mongoose";

export interface IRtDatabase extends Document {
  databaseName: string;
}

const RtDatabaseSchema: Schema = new Schema({
  databaseName: { type: String, required: true, unique: true },
});

// Export the model and return your IRtDatabase interface
export default model<IRtDatabase>("RtDatabase", RtDatabaseSchema);
