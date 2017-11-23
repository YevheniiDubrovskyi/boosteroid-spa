const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const config = require('config');

const { emailService, templateService } = require('./services');
emailService.setTemplateService(templateService);

const { authRouter, mocksRouter } = require('./routes');

const appLogsPath = path.join(
  __dirname,
  config.get('logs.path'),
  config.get('logs.filename')
);
const appLogs = fs.createWriteStream(appLogsPath, { flags: 'a' });
const app = express();

app.disable('x-powered-by');
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger(config.get('logs.type'), { stream: appLogs }));
app.use('/auth', authRouter);
app.use('/mocks', mocksRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500)
    .json({
      message: err.message,
      status: err.statusCode || 500
    });
});

module.exports = app;
