import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config';

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const validatePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const getToken = data => jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
