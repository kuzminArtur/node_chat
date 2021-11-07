const express = require('express')
const app = express()
//const helmet = require("helmet");
const router = require('./routes');
const jsonParser = require('express').json();

//app.use(helmet());
app.use(jsonParser);
//app.use(express.urlencoded({ extended: true }))
app.use(router);

app.listen(3000);