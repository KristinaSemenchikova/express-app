import mongoose, { model } from 'mongoose';
import { PHONE_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP } from '../constants/validation';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    match: EMAIL_REGEXP,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    match: PASSWORD_REGEXP,
    required: true,
  },
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
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

const UserModel = model('User', userSchema);

export default UserModel;
