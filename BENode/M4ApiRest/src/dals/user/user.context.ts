import { model, Schema } from 'mongoose';
import { User } from './user.model.js';

const userSchema = new Schema<User>({
  email: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  role: { type: Schema.Types.String, required: true },
});

export const userContext = model<User>('User', userSchema);
