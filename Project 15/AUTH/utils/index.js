import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const hashPassword = async (password) => {
  return argon2.hash(String(password));
};

const verifyPassword = async (hash, password) => {
  return argon2.verify(hash, String(password));
};

const createAccessToken = (id) => {
  return jwt.sign({ user_id: id }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ user_id: id }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '1d',
  });
};

const createTokens = (id) => {
  return {
    access_token: createAccessToken(id),
    refresh_token: createRefreshToken(id),
  };
};

const verifyToken = (token, isRefreshToken = false) => {
  return jwt.verify(
    token,
    isRefreshToken
      ? process.env.REFRESH_SECRET_KEY
      : process.env.ACCESS_SECRET_KEY
  );
};

const encryptEmail = (email) => {
  const encryptionKey = Buffer.from(process.env.SECRET_KEY, 'base64');
  const iv = Buffer.from(process.env.SECRET_IV, 'base64');
  const cipher = crypto.createCipheriv('aes-128-cbc', encryptionKey, iv);
  let encryptedEmail = cipher.update(email, 'utf-8', 'base64');
  encryptedEmail += cipher.final('base64');
  return encryptedEmail;
};

const decryptEmail = (encryptedEmail) => {
  const encryptionKey = Buffer.from(process.env.SECRET_KEY, 'base64');
  const iv = Buffer.from(process.env.SECRET_IV, 'base64');
  const decipher = crypto.createDecipheriv('aes-128-cbc', encryptionKey, iv);
  let decryptedEmail = decipher.update(encryptedEmail, 'base64', 'utf-8');
  decryptedEmail += decipher.final('utf-8');
  return decryptedEmail;
};

export default {
  hashPassword,
  verifyPassword,
  createTokens,
  verifyToken,
  encryptEmail,
  decryptEmail,
};
