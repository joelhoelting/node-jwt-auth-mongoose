import jwt from 'jsonwebtoken';
import User from '../database/models/user.js';
import { generateResObj } from '../helpers/response.js';
import constants from '../constants/index.js';

export const validateToken = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }

    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error(constants.requestValidationMessage.TOKEN_INVALID);
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send(generateResObj(error.message, error, false));
  }
};
