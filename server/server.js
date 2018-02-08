const _ = require('lodash');
const express = require('express');
const http = require('http');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const socketIO = require('socket.io');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const { resolve } = require('path');
const app = express();

global.appConfig = isDev ? require('./config.dev.json') : require('./config.prod.json');
global.appConfig = _.merge(global.appConfig, { isDev });
global.errorHandler = require('./features/core').errorHandler;

const db = require('./db/models');
// Setup web server
// This sets up all middlewares and api routes
// In production we need to pass these values in instead of relying on webpack
const server = http.createServer(app);
const io = socketIO(server);
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
  ssrEnabled: global.appConfig.ssrEnabled,
  io,
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';


db.sequelize.sync().then(() => {
  // Start your app.
  server.listen(port, host, (err) => {
    if (err) {
      return logger.error(err.message);
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
        }
        return logger.appStarted(port, prettyHost, url);
      });
    } else {
      return logger.appStarted(port, prettyHost);
    }
    return logger.appStarted(port, prettyHost);
  });
});
