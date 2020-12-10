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
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 60,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 60,
    required: true,
  },
  fullName: {
    type: String,
    virtual: true,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
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
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
});

const UserModel = model('User', userSchema);

export default UserModel;
