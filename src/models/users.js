import mongoose, { model } from 'mongoose';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../constants/validation';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 60,
    required: true,
  },
  email: {
    type: String,
    match: EMAIL_REGEXP,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    min: 3,
    match: PHONE_REGEXP,
  },
  password: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
});

const UserModel = model('User', userSchema);

export default UserModel;
