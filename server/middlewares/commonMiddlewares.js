const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = function commonMiddlewares(app) {
  if (global.appConfig.isProd) {
    // compression middleware compresses your server responses which makes them
    // smaller (applies also to assets). You can read more about that technique
    // and other good practices on official Express.js docs http://mxs.is/googmy
    app.use(compression());
  }

  app.use(helmet());
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(bodyParser.json()); // handle json data
  app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
  app.use(morgan('dev'));
};
