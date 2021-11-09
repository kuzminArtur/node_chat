const app = require('express')();
//const helmet = require("helmet");
const router = require('./routes');
const jsonParser = require('express').json();
const prismaErrorHandler = require('../chat/middlewares/prismaErrorHandler');

//app.use(helmet());
app.use(jsonParser);
app.use(router);
app.use(prismaErrorHandler);
app.listen(3000);