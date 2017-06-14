import Joi from 'joi';

/**
 * Utility helper for Joi validation
 * @param data
 * @param schema
 * @return {Promise}
 */
function validate (data,schema) {
  return new Promise((resolve,reject) => {
    const {error, value} = Joi.validate(data, schema, {abortEarly: false});
    if (error) {
      reject(error);
    }
    resolve(value);
  });
}

export default validate;