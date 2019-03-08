const path = require('path');
const _ = require('lodash');
const http = require('http');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const globby = require('globby');
const express = require('express');
const socketIO = require('socket.io');
let fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// const renderServer = require('./render-server');
const renderDom = require('./render-dom');
const isDev = process.env.NODE_ENV !== 'production';
const isProd = !isDev;
global.appConfig = _.merge({}, require('./config.json'), require('./config.prod.json'), {
  isDev,
  isProd,
});
global.errorHandler = require('../server/features/core').errorHandler;

module.exports = compiler => {
  app.use(compression());
  app.use(helmet());
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(bodyParser.json()); // handle json data
  app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
  app.use(morgan('dev'));

  // Setup api middlewares
  apiMiddlewares(app);

  if (isProd) {
    // We don't need to send index/document request served by static middleware, hence excluding.
    app.use('/assets', express.static(path.resolve('build', 'assets')));
    app.use('/static', express.static(path.resolve('build', 'static')));
    app.use('/assets/manifest.json', (req, res) =>
      res.send(fs.readFileSync(path.resolve('build', 'assets', 'manifest.json')).toString())
    );
    app.use('/service-worker.js', (req, res) => {
      res.setHeader("Content-Type", "application/javascript");
      res.send(fs.readFileSync(path.resolve('build', 'service-worker.js')).toString());
    });

    const buildPath = path.join(__dirname, '../', 'build');
    app.get('*', (req, res) => {
      fs.readFile(`${buildPath}/index.html`, (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else if (global.appConfig.ssrEnabled) {
          // renderServer(req, res, file.toString());
        } else {
          renderDom(req, res, file.toString());
        }
      });
    });
  } else {
    // Serve any static files from the public/assets folder
    app.use('/assets', express.static(path.resolve('public', 'assets')));

    if (isDev) {
      const middleware = webpackDevMiddleware(compiler, {
        logLevel: 'debug',
        publicPath: compiler.options.output.publicPath,
        silent: false,
        stats: 'errors-only',
        serverSideRender: true,
      });

      // Since webpackDevMiddleware uses memory-fs internally to store build
      // artifacts, we use it instead
      fs = middleware.fileSystem;

      app.use(middleware);
    }

    app.use(
      webpackHotMiddleware(compiler, {
        heartbeat: 2000,
      })
    );

    app.get('*', (req, res) => {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else if (global.appConfig.ssrEnabled) {
          // renderServer(req, res, file.toString());
        } else {
          renderDom(req, res, file.toString());
        }
      });
    });
  }

  return app;
};

function apiMiddlewares(app) {
  globby([`${__dirname}/features/*/**/*.policy.js`]).then(policies => {
    policies.forEach(policyPath => {
      /* eslint import/no-dynamic-require: "off" */
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // App public routes
  require('./features/app/app.routes')(app);
  // Content public routes
  require('./features/content/content-public.routes')(app);
  // ========= Secure routes
  require('./features/auth')(app);

  // Content public routes
  require('./features/content/content.routes')(app);

  // Examples
  // Shop routes
  require('./features/shop/customer/customer.routes')(app);
  require('./features/shop/productcategory/productcategory.routes')(app);
  require('./features/shop/product/product.routes')(app);
  require('./features/shop/order/order.routes')(app);
}
