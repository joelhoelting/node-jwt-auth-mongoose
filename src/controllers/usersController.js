import usersService from '../services/usersService.js';
import { generateResObj } from '../helpers/response.js';

import constants from '../constants/index.js';

export default {
  signUp: async (req, res) => {
    try {
      const serviceResponse = await usersService.signUp(req.body);
      return res.status(200).send(generateResObj(constants.usersMessage.SIGN_UP_SUCCESS, serviceResponse));
    } catch (error) {
      return res.status(400).send(generateResObj(error.message, error, false));
    }
  },
  signIn: async (req, res) => {
    try {
      const serviceResponse = await usersService.signIn(req.body);
      return res.status(200).send(generateResObj(constants.usersMessage.SIGN_IN_SUCCESS, serviceResponse));
    } catch (error) {
      return res.status(400).send(generateResObj(error.message, error, false));
    }
  },
  validateToken: async (req, res) => {
    res.status(200).send(generateResObj(constants.requestValidationMessage.TOKEN_VALID, { user: req.user }));
  }
};
