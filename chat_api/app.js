const app = require('express')();
const jsonParser = require('express').json();
const helmet = require('helmet');
const config = require('../configs');
const router = require('./routes');

const { prismaErrorHandler } = require('../prisma');
const errorHandler = require('./middlewares/errorHandler');
const { auth } = require('../users');
const { startWebSocketServer } = require('../chat');

app.use(helmet());
app.use(jsonParser);
app.use(auth);
app.use(router);
app.use(prismaErrorHandler);
app.use(errorHandler);
const server = app.listen(config.server.port);
startWebSocketServer(server);
