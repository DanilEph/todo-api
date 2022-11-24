import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  login: string;
  password: string;
}

export const UserSchema = new mongoose.Schema<User>({
  login: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});
