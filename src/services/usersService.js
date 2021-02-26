import User from '../database/models/user.js';

import constants from '../constants/index.js';

export default {
  signUp: async ({ email, password }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error(constants.usersMessage.DUPLICATE_EMAIL);
      }
      const user = new User({ email, password });
      await user.save();

      const token = await user.generateAuthToken();
      return { user, jwt: token };
    } catch (error) {
      throw new Error(error);
    }
  },
  signIn: async ({ email, password }) => {
    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      return { user, jwt: token };
    } catch (error) {
      throw new Error(error);
    }
  }
};
