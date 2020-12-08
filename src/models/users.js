import mongoose, { model } from 'mongoose';
import { PHONE_REGEXP } from '../constants/validation';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 60,
    required: true,
  },
  phone: {
    type: String,
    min: 3,
    match: PHONE_REGEXP,
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  credentials: {
    type: Schema.Types.ObjectId,
    ref: 'AuthInfo',
  },
});

const UserModel = model('User', userSchema);

export default UserModel;
