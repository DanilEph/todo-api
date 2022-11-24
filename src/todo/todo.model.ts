import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/user.model';

export interface Todo extends Document {
  content: string;
  author: User;
}

export const TodoSchema = new mongoose.Schema<Todo>(
  {
    content: { type: String, require: true },
    author: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
