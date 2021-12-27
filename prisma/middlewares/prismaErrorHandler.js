const Prisma = require('@prisma/client');

// TODO: Вынести текстовки ошибок в файл конфигурации
const PRISMA_ERRORS = {
  P1001: {
    message: 'Connection to database has been lost',
    status: 503,
  },
  P2002: {
    message: 'Unique constraint failed',
    status: 409,
  },
  CLIENT_INIT: {
    message: 'Could not establish connection to database',
    status: 503,
  },
};

const prismaErrorHandler = (err, req, res, next) => {
  let errorKey;
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // eslint-disable-next-line no-prototype-builtins
    if (PRISMA_ERRORS.hasOwnProperty(err.code)) {
      errorKey = err.code;
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    errorKey = 'CLIENT_INIT';
  }
  const resultError = errorKey ? PRISMA_ERRORS[errorKey] : err;
  next(resultError);
};

module.exports = prismaErrorHandler;
