const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = function commonMiddlewares(app) {
  app.use(cors());
  app.use(helmet());
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(bodyParser.json()); // handle json data
  app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
  app.use(morgan('dev'));
};
