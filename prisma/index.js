const prisma = require('./utils/prismaClient');
const prismaErrorHandler = require('./middlewares/prismaErrorHandler');

module.exports = { prisma, prismaErrorHandler };
