import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const validatePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const getToken = data => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);

export const refreshToken = token => {
  const payload = verifyToken(token);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;
  return getToken(payload);
};
