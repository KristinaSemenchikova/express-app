import mongoose, { model } from 'mongoose';
import { EMAIL_REGEXP } from '../constants/validation';

const { Schema } = mongoose;

const authSchema = new Schema({
  email: {
    type: String,
    match: EMAIL_REGEXP,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const AuthInfoModel = model('AuthInfo', authSchema);

export default AuthInfoModel;
