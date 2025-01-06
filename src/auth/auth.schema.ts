import { Schema, model, Document } from 'mongoose';

export interface IAuth extends Document {
  userId: string;
  refreshToken: string;
  device: string;
  createdAt: Date;
}

const AuthSchema = new Schema<IAuth>({
  userId: { type: String, required: true, ref: 'User' },
  refreshToken: { type: String, required: true },
  device: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Auth = model('Auth', AuthSchema);
