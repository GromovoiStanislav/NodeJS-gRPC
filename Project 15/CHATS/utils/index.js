import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
};

export default {
  verifyToken,
};
