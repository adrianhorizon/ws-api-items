const boom = require('@hapi/boom');
const { config } = require('../../config');

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

const logErrors = (err, _req, _res, next) => {
  next(err);
}

const wrapErrors = (err, _req, _res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

const errorHandler = (err, _req, res) => {
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};
