/* eslint-disable no-prototype-builtins */
const Prisma = require('@prisma/client');


const ERROR_CODE_DESCRIBE = {
    'P2002': {
        message: 'Объект с указанным уникальным свойством уже существует',
        status: 409
    },
}

const prismaErrorHandler = (err, req, res, next) => {

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (ERROR_CODE_DESCRIBE.hasOwnProperty(err.code)) {
            res
                .status(ERROR_CODE_DESCRIBE[err.code].status)
                .send(ERROR_CODE_DESCRIBE[err.code].message);
        }
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        res
            .status(503)
            .send('Отсутствует подключение к БД');
    }
    else
        res
            .status(500)
            .send('Ошибка сервера');
    next();
}

module.exports = prismaErrorHandler;