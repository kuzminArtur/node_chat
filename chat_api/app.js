const app = require('express')();
const jsonParser = require('express').json();
const config = require('../configs/appConfig');
// const helmet = require("helmet");
const router = require('./routes');

const prismaErrorHandler = require('../prisma/middlewares/prismaErrorHandler');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('../users/middlewares/auth');
const { startWebSocketServer } = require('../chat/webSocket/webSoket');
// app.use(helmet());
app.use(jsonParser);
app.use(auth);
app.use(router);
app.use(prismaErrorHandler);
app.use(errorHandler);
const server = app.listen(config.server.port);
startWebSocketServer(server);
