import { generateResObj } from '../helpers/response.js';
import constants from '../constants/index.js';

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false });

  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path
      };
    });
    return errorDetails;
  }
  return null;
};

export const validateBody = (schema) => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.body, schema);
    if (error) {
      return res.status(400).send(generateResObj(constants.requestValidationMessage.BAD_REQUEST, error, false));
    }
    return next();
  };
};

export const validateQueryParams = (schema) => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.query, schema);
    if (error) {
      return res.status(400).send(generateResObj(constants.requestValidationMessage.BAD_REQUEST, error, false));
    }
    return next();
  };
};
