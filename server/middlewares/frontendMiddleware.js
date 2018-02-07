/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  // Setup common middlewares
  const commonMiddlewares = require('./commonMiddlewares');
  commonMiddlewares(app, options);
  // Setup api middlewares
  const apiMiddlewares = require('./apiMiddlewares');
  apiMiddlewares(app, options);

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
