import mongoose from 'mongoose';
import constants from '../constants/index.js';

export const checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
};
