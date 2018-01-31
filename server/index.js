const _ = require('lodash');
const globby = require('globby');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const { resolve } = require('path');
const app = express();

global.appConfig = isDev ? require('./config.dev.json') : require('./config.prod.json');
global.appConfig = _.merge(global.appConfig, { isDev });
global.errorHandler = require('./features/core').errorHandler;

app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
app.use(morgan('dev'));
/* eslint no-mixed-operators: "off" */
const expiryDate = new Date(Date.now() + 20 * 60 * 1000); // 20 minute
app.use(session({
  secret: global.appConfig.Security.SESSION_SECRET,
  resave: false,
  httpOnly: true,
  saveUninitialized: true,
  expires: expiryDate,
}));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
const db = require('./db/models');
db.sequelize.sync().then(() => {
  // API Routes
  apiRoutes();

  // Setup web server
  // In production we need to pass these values in instead of relying on webpack
  setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
  });

  // get the intended host and port number, use localhost and port 3000 if not provided
  const customHost = argv.host || process.env.HOST;
  const host = customHost || null; // Let http.Server use its default IPv6/4 host
  const prettyHost = customHost || 'localhost';

  // Start your app.
  app.listen(port, host, (err) => {
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

function apiRoutes() {
  /* eslint global-require: "off" */
  globby([`${__dirname}/features/*/**/*.policy.js`]).then((policies) => {
    policies.forEach((policyPath) => {
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // Examples public routes
  require('./features/examples')(app);
  // App public routes
  require('./features/app/app.routes')(app);
  // Content public routes
  require('./features/content/content-public.routes')(app);
  // ========= Secure routes
  // User's feature, this incldues auth middleware as well
  require('./features/users')(app);
  // Content public routes
  require('./features/content/content.routes')(app);

  // get all registered routes of express
  // app._router.stack.forEach((r: any) => {
  //   if (r.route && r.route.path) {
  //     console.log(r.route.path)
  //   }
  // });
}
