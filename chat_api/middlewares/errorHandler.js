const serverError = {
  status: 500,
  message: 'Server error',
};

const errorHandler = async (err, req, res, next) => {
  const errToResponse = err.status ? err : serverError;
  const { message, status } = errToResponse;
  res.status(status).send({ error: message });
  next();
};

module.exports = errorHandler;
